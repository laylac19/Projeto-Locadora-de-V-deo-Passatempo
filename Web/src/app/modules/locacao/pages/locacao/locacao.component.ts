import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LocacaoModel} from "../../../../model/locacao.model";
import {ClasseService} from "../../../../shared/service/classe.service";
import {SelectItem} from "primeng/api";
import {MensagensUtil} from "../../../../shared/util/mensagens-util";
import {ColunaModel} from "../../../../shared/util/coluna.model";
import {ItemListModel} from "../../../../model/list/item-list.model";
import {VinculoEntidades} from "../../../../model/vinculo-entidade.model";
import {ClienteService} from "../../../../shared/service/cliente.service";
import {ItemService} from "../../../../shared/service/item.service";
import {LocacaoService} from "../../../../shared/service/locacao.service";
import {MensagensProntasEnumModel} from "../../../../shared/util/mensagensProntasEnum.model";
import {ItemModel} from "../../../../model/item.model";

@Component({
    selector: 'app-locacao',
    templateUrl: './locacao.component.html',
    styleUrls: ['./locacao.component.scss']
})
export class LocacaoComponent implements OnInit {

    public formLocacao: FormGroup;
    public novaLocacao: LocacaoModel;
    public itemLocacao: ItemModel;

    public dtLocacao: Date = new Date();
    public dtDevolucaoPrevista: Date = new Date();
    public dtDevolucaoEfetiva: Date = new Date();

    public clientesDropDown: SelectItem[];
    public itensDropdown: SelectItem[];
    public colunas: ColunaModel[] = [];

    public idLocacao: number;
    public idItem: number;
    public valorTotalLocacao: number[];
    public depoisSalvar: boolean = false;
    public listarLocacoes: boolean = false;

    @Input() locacaoModel: LocacaoModel;
    @Output() resForm: EventEmitter<boolean> = new EventEmitter();


    constructor(
        private builder: FormBuilder,
        private locacaoService: LocacaoService,
        private clienteService: ClienteService,
        private itemService: ItemService,
        private message: MensagensUtil
    ) {
    }

    ngOnInit(): void {
        this.novoFormulario();
        this.dropDownCliente();
        this.dropDownItensDisponiveis();
        this.colunasTabelaElenco();
    }

    public dropDownCliente(): void {
        this.clienteService.fillDropDownLease().subscribe((data) => {
            this.clientesDropDown = data;
        });
    }

    public dropDownItensDisponiveis(): void {
        this.itemService.fillAvailableItensDropdown().subscribe((data) => {
            this.itensDropdown = data;
        });
    }

    public colunasTabelaElenco(): void {
        this.colunas = [
            new ColunaModel('label', 'Itens'),
            new ColunaModel('acoes', 'Ações', '132px')
        ]
    }

    public novoFormulario(): void {
        this.formLocacao = this.builder.group(({
            id: [null],
            dtLocacao: [null, [Validators.required]],
            dtDevolucaoPrevista: [null, [Validators.required]],
            valorCobrado: ['', [Validators.required]],
            dtDevolucaoEfetiva: [null],
            multaCobrada: [''],
            idCliente: [null, [Validators.required]],
            idItem: [null, [Validators.required]]
        }));
    }

    public salvarFormulario(): void {
        this.novaLocacao = this.formLocacao.getRawValue();
        this.locacaoService.insert(this.novaLocacao).subscribe({
            next: () => {
                if (this.novaLocacao.id) {
                    this.message.mensagemSucesso(MensagensProntasEnumModel.ATUALIZAR_LOCACAO.descricao);
                } else {
                    this.message.mensagemSucesso(MensagensProntasEnumModel.CADASTRO_LOCACAO.descricao);
                }
                this.fecharForm();
                this.listarLocacoes = true;
            },
            error: () => {
                this.message.mensagemSucesso(MensagensProntasEnumModel.FALHA_LOCACAO.descricao);
            }
        })
    }

    public visualizarLocacao(id: number): void {
        this.locacaoService.findById(id).subscribe({
            next: (response) => {
                this.depoisSalvar = true;
                this.formLocacao.patchValue(response);
                this.formLocacao.disable();
            }
        });
    }

    public novaDevolucao(id: number): void {
        this.depoisSalvar = true;
    }

    public editarForm(id: number): void {
        this.locacaoService.findById(id).subscribe({
                next: (response) => {
                    this.depoisSalvar = true;
                    this.formLocacao.patchValue(response);
                },
            }
        );
    }

    public setDataAtual(dtLocacao: Date): string {
        return (dtLocacao.getDate() + '/' + dtLocacao.getMonth() + '/' + dtLocacao.getFullYear()).toString();
    }

    public fecharForm(): void {
        this.depoisSalvar = false;
        this.formLocacao.reset();
        this.resForm.emit();
    }

    setDataDevoluvaoPrevista(dtLocacao: Date) {
        return undefined;
    }

    confirmarLocacaoItem() {
        this.idItem = this.formLocacao.get('idItem')?.value;
        this.itemService.valueOfItemLease(this.idItem).subscribe((valor)=> {
            this.valorTotalLocacao = valor;
        });
        console.log(this.valorTotalLocacao);
        this.formLocacao.get('valorCobrado')?.setValue(this.valorTotalLocacao);
    }
}
