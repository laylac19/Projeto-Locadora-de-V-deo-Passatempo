import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ItemModel} from "../../../../model/item.model";
import {ItemService} from "../../../../shared/service/item.service";
import {SelectItem} from "primeng/api";
import {TituloService} from "../../../../shared/service/titulo.service";
import {MensagensProntasEnumModel} from "../../../../shared/util/mensagensProntasEnum.model";
import {MensagensUtil} from "../../../../shared/util/mensagens-util";

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

    public formItem: FormGroup;
    public novoItem: ItemModel;

    public listarItens: boolean = false;

    public titulosDropDown: SelectItem[];
    public tipoItemDropDown: SelectItem[];

    public dtAquisicao: Date = new Date();

    @Input() itemModel: ItemModel;
    @Output() resForm: EventEmitter<boolean> = new EventEmitter();

    constructor(
        private builder: FormBuilder,
        private itemService: ItemService,
        private tituloServie: TituloService,
        private message: MensagensUtil
    ) {
    }

    ngOnInit(): void {
        this.novoFormulario();
        this.preencherDropdowns();
    }

    public preencherDropdowns(): void {
        this.dropDownItem();
        this.dropDownTItulo();
    }

    public dropDownTItulo(): void {
        this.tituloServie.fillDropdown().subscribe((data) => {
            this.titulosDropDown = data;
        })
    }

    public dropDownItem(): void {
        this.itemService.fillTypeCategoryItenDropdown().subscribe((data) => {
            this.tipoItemDropDown = data;
        })
    }

    public novoFormulario(): void {
        this.formItem = this.builder.group({
            id: [null],
            numeroSerie: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
            data: [null, [Validators.required]],
            tipoItem: ['', [Validators.required]],
            idTitulo: ['', [Validators.required]]
        });
    }

    public salvarFormulario(): void {
        this.novoItem = this.formItem.getRawValue();
        this.itemService.insert(this.novoItem).subscribe({
            next: () => {
                if (this.novoItem.id) {
                    this.message.mensagemSucesso(MensagensProntasEnumModel.ATUALIZAR_DIRETOR.descricao);
                } else {
                    this.message.mensagemSucesso(MensagensProntasEnumModel.CADASTRO_DIRETOR.descricao);}
                this.fecharForm();
                this.listarItens = true;
            },
            error: () => {
                this.message.mensagemErro(MensagensProntasEnumModel.FALHA_DIRETOR.descricao);            }
        });
    }

    public editarItem(id: number): void {
        this.itemService.findById(id).subscribe({
                next: (response) => {
                    response.data = new Date(response.data);
                    this.formItem.patchValue(response);
                },
            }
        );
    }

    public fecharForm(): void {
        this.formItem.reset();
        this.resForm.emit();
    }
}
