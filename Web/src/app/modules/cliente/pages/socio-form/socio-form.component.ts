import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SelectItem} from "primeng/api";
import {SocioModel} from "../../../../model/socio.model";
import {ClienteService} from "../../../../shared/service/cliente.service";
import {VinculoEntidades} from "../../../../model/vinculo-entidade.model";
import {MensagensUtil} from "../../../../shared/util/mensagens-util";
import {MensagensProntasEnumModel} from "../../../../shared/util/mensagensProntasEnum.model";
import {ColunaModel} from "../../../../shared/util/coluna.model";

@Component({
    selector: 'app-socio-form',
    templateUrl: './socio-form.component.html',
    styleUrls: ['./socio-form.component.scss']
})
export class SocioFormComponent implements OnInit {

    public formSocio: FormGroup;
    public novoSocio: SocioModel;
    public vinculo: VinculoEntidades;

    public listarSocios: boolean = false;
    private listarDependentes: boolean  = false;
    public idSocio: number;
    public idDependente: number;

    public clientesDropDown: SelectItem[];
    public listaDependentesSocio: SelectItem[] = [];
    public colunas: ColunaModel[] = [];

    @Input() socioModel: SocioModel;
    @Input() abilitarAcordion: boolean;
    @Input() abirAcordion: boolean;
    @Output() resForm: EventEmitter<boolean> = new EventEmitter();


    constructor(
        private builder: FormBuilder,
        private clienteService: ClienteService,
        private message: MensagensUtil
    ) {
    }

    ngOnInit(): void {
        this.novoFormulario();
        this.colunasTabelaDependentes();
        this.preencherDropdown();
    }

    public colunasTabelaDependentes(): void {
        this.colunas = [
            new ColunaModel('label', 'Dependentes'),
            new ColunaModel('acoes', 'Ações', '132px')
        ]
    }

    public preencherDropdown() {
        this.clienteService.fillNonPartnersCustomersDropdown().subscribe((data) => {
            this.clientesDropDown = data;
        })
    }

    public novoFormulario(): void {
        this.formSocio = this.builder.group({
            id: [null, [Validators.required]],
            cpf: ['', [Validators.required, Validators.minLength(11)]],
            endereco: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(100)]],
            telefone: ['', [Validators.required, Validators.minLength(11)]],
            idDependente: [null, [Validators.required]],
        });
    }

    public salvarFormulario(): void {
        this.novoSocio = this.formSocio.getRawValue();
        this.clienteService.savePartners(this.novoSocio).subscribe({
            next: (response) => {
                this.idSocio = response.id;
                this.abilitarAcordion = false;
                this.abirAcordion = true;
                if (this.novoSocio.id) {
                    this.message.mensagemSucesso(MensagensProntasEnumModel.ATUALIZAR_SOCIO.descricao);
                } else {
                    this.message.mensagemSucesso(MensagensProntasEnumModel.CADASTRO_SOCIO.descricao);}
            },
            error: () => {
                this.message.mensagemErro(MensagensProntasEnumModel.FALHA_SOCIO.descricao);
            }
        })
        this.preencherDropdown();
    }

    public editarForm(id: number): void {
        this.clienteService.findById(id).subscribe({
                next: (response) => {
                    this.formSocio.patchValue(response);
                    this.listarDependentesDeSocio(id);
                },
            }
        );
    }

    public visualizarDadosSocio(id: number) {
        this.clienteService.findById(id).subscribe({
            next: (response) => {
                this.formSocio.disabled;
                this.formSocio.patchValue(response);
                this.listarDependentesDeSocio(id);
            },
        })
    }

    public fecharForm(): void {
        this.formSocio.reset();
        this.resForm.emit();
        this.formSocio.enable();
        this.listaDependentesSocio = [];
    }

    public adicionarDependente(): void {
        this.idDependente = this.formSocio.get('idDependente')?.value;
        this.vinculo = new VinculoEntidades(this.idSocio, this.idDependente);
        this.clienteService.insertDependent(this.vinculo).subscribe({
            next: () => {
                this.listarDependentes = true;
            }
        })
    }

    public listarDependentesDeSocio(idSocio: number): void {
        this.clienteService.findDependentsOfPartner(idSocio).subscribe((dataDependentes) => {
            this.listaDependentesSocio = dataDependentes;
        })
    }

    public retirarDependente(rowData: any): void {
        this.listaDependentesSocio = this.listaDependentesSocio.slice(rowData.value);
    }
}
