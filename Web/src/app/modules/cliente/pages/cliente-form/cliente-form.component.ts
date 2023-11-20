import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClienteModel} from "../../../../model/cliente.model";
import {ClienteService} from "../../../../shared/service/cliente.service";
import {SelectItem} from "primeng/api";
import {MensagensUtil} from "../../../../shared/util/mensagens-util";
import {MensagensProntasEnumModel} from "../../../../shared/util/mensagensProntasEnum.model";

@Component({
    selector: 'app-cliente-form',
    templateUrl: './cliente-form.component.html',
    styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit {

    public formCliente: FormGroup;
    public novoCliente: ClienteModel;
    public sexo: SelectItem[];

    public listarClientes: boolean = false;
    public abilitarBotao: boolean = true;
    public novoDado: boolean;
    public numInsc: string;

    public dataNascimento: Date = new Date();

    @Input() clienteModel: ClienteModel;
    @Output() resForm: EventEmitter<boolean> = new EventEmitter();

    constructor(
        private builder: FormBuilder,
        private clienteService: ClienteService,
        private message: MensagensUtil
    ) {
    }

    ngOnInit(): void {
        this.novoFormulario();
        this.preencherDropdown();
    }

    public preencherDropdown() {
        this.sexo = [
            {label: 'Feminino', value: 1},
            {label: 'Masculino', value: 2},
            {label: 'Prefiro não informar', value: 3},
            {label: 'Outros', value: 4}
        ]
    }

    public novoFormulario(): void {
        this.formCliente = this.builder.group({
            id: [null],
            nome: ['', [Validators.required, Validators.minLength(2)]],
            dataNascimento: ['', [Validators.required]],
            sexo: ['', [Validators.required]],
        });
    }

    public salvarFormulario(): void {
        this.novoCliente = this.formCliente.getRawValue();
        this.clienteService.insert(this.novoCliente).subscribe({
            next: () => {
                if (this.novoCliente.id) {
                    this.message.mensagemSucesso(MensagensProntasEnumModel.ATUALIZAR_CLIENTE.descricao);
                } else {
                    this.message.mensagemSucesso(MensagensProntasEnumModel.CADASTRO_CLIENTE.descricao);}
                this.fecharForm();
                this.listarClientes = true;
            },
            error: () => {
                this.message.mensagemErro(MensagensProntasEnumModel.FALHA_CLIENTE.descricao);
            }
        })
    }

    public editarCliente(id: number): void {
        this.clienteService.findById(id).subscribe({
                next: (response) => {
                    !this.novoDado;
                    response.dataNascimento = new Date(response.dataNascimento);
                    this.numInsc = response.numeroInscricao;
                    this.formCliente.patchValue(response);
                },
            }
        );
    }

    public visualizarCliente(id: number): void {
        this.clienteService.findById(id).subscribe({
                next: (response) => {
                    !this.novoDado;
                    response.dataNascimento = new Date(response.dataNascimento);
                    this.numInsc = response.numeroInscricao;
                    this.formCliente.patchValue(response);
                    this.abilitarBotao = true;
                    this.formCliente.disable();
                },
            }
        );
    }

    public fecharForm(): void {
        this.numInsc = '';
        this.formCliente.reset();
        this.formCliente.enable();
        this.resForm.emit();
    }
}
