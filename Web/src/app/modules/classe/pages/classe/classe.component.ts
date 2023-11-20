import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClasseModel} from "../../../../model/classe.model";
import {ClasseService} from "../../../../shared/service/classe.service";
import {MensagensProntasEnumModel} from "../../../../shared/util/mensagensProntasEnum.model";
import {MensagensUtil} from "../../../../shared/util/mensagens-util";

@Component({
    selector: 'app-classe',
    templateUrl: './classe.component.html',
    styleUrls: ['./classe.component.scss']
})
export class ClasseComponent implements OnInit {

    public formClasse: FormGroup;
    public novaClasse: ClasseModel;

    public listarClasses: boolean = false;

    @Input() classeModel: ClasseModel;
    @Output() resForm: EventEmitter<boolean> = new EventEmitter();

    constructor(
        private builder: FormBuilder,
        private service: ClasseService,
        private message: MensagensUtil
    ) {
    }

    ngOnInit(): void {
        this.novoFormulario();
    }

    public novoFormulario(): void {
        this.formClasse = this.builder.group({
            id: [null],
            nomeClasse: ['', [Validators.required, Validators.minLength(2)]],
            valor: ['', [Validators.required]],
            prazoDevolucao: ['', [Validators.required]]
        });
    }

    public salvarFormulario(): void {
        this.novaClasse = this.formClasse.getRawValue();
        this.service.insert(this.novaClasse).subscribe({
            next: () => {
                if(this.novaClasse.id) {
                    this.message.mensagemSucesso(MensagensProntasEnumModel.ATUALIZAR_CLASSE.descricao);
                } else {
                    this.message.mensagemSucesso(MensagensProntasEnumModel.CADASTRO_CLASSE.descricao);}
                this.fecharForm();
                this.listarClasses = true;
            },
            error: () => {
                this.message.mensagemErro(MensagensProntasEnumModel.FALHA_CLASSE.descricao);
            }
        })
    }

    public editarForm(id: number): void {
        this.service.findById(id).subscribe({
                next: (response) => {
                    this.formClasse.patchValue(response);
                },
            }
        );
    }

    public fecharForm(): void {
        this.formClasse.reset();
        this.resForm.emit();
    }
}
