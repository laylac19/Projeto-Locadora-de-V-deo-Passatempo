import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AtorModel} from "../../../../model/ator.model";
import {AtorService} from "../../../../shared/service/ator.service";
import {MensagensUtil} from "../../../../shared/util/mensagens-util";
import {MensagensProntasEnumModel} from "../../../../shared/util/mensagensProntasEnum.model";

@Component({
    selector: 'app-ator',
    templateUrl: './ator.component.html',
    styleUrls: ['./ator.component.scss']
})
export class AtorComponent implements OnInit {

    public formAtor: FormGroup;
    public novoAtor: AtorModel;

    public listarAtores: boolean = false;

    @Input() atorModel: AtorModel;
    @Output() resForm: EventEmitter<boolean> = new EventEmitter();

    constructor(
        private builder: FormBuilder,
        private service: AtorService,
        private message: MensagensUtil
    ) {
    }

    ngOnInit(): void {
        this.novoFormulario();
    }

    public novoFormulario(): void {
        this.formAtor = this.builder.group({
            id: [null],
            nomeAtor: ['', [Validators.required, Validators.minLength(3)]]
        });
    }

    public salvarFormulario(): void {
        this.novoAtor = this.formAtor.getRawValue();
        this.service.insert(this.novoAtor).subscribe({
            next: () => {
                if (this.novoAtor.id) {
                    this.message.mensagemSucesso(MensagensProntasEnumModel.ATUALIZAR_ATOR.descricao);
                } else {
                    this.message.mensagemSucesso(MensagensProntasEnumModel.CADASTRO_ATOR.descricao);}
                this.fecharForm();
                this.listarAtores = true;
            },
            error: () => {
                this.message.mensagemErro(MensagensProntasEnumModel.FALHA_ATOR.descricao);
            }
        });
    }

    public editarAtor(id: number): void {
        this.service.findById(id).subscribe({
                next: (response) => {
                    this.formAtor.patchValue(response);
                },
            }
        );
    }

    public fecharForm(): void {
        this.formAtor.reset();
        this.resForm.emit();
    }
}
