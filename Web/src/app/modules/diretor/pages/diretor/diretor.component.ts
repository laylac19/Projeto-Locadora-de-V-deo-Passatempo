import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DiretorModel} from "../../../../model/diretor.model";
import {DiretorService} from "../../../../shared/service/diretor.service";
import {MensagensUtil} from "../../../../shared/util/mensagens-util";
import {MensagensProntasEnumModel} from "../../../../shared/util/mensagensProntasEnum.model";

@Component({
    selector: 'app-diretor',
    templateUrl: './diretor.component.html',
    styleUrls: ['./diretor.component.scss']
})
export class DiretorComponent implements OnInit {

    public formDiretor: FormGroup;
    public novoDiretor: DiretorModel;

    public listarDiretores: boolean = true;

    @Input() diretorModel: DiretorModel;
    @Output() resForm: EventEmitter<boolean> = new EventEmitter();

    constructor(
        private builder: FormBuilder,
        private service: DiretorService,
        private message: MensagensUtil
    ) {
    }

    ngOnInit(): void {
        this.novoFormulario();
    }

    public novoFormulario(): void {
        this.formDiretor = this.builder.group({
            id: [null],
            nomeDiretor: ['', [Validators.required, Validators.minLength(3)]]
        });
    }

    public salvarFormulario(): void {
        this.novoDiretor = this.formDiretor.getRawValue();
        this.service.insert(this.novoDiretor).subscribe({
            next: () => {
                if (this.novoDiretor.id) {
                    this.message.mensagemSucesso(MensagensProntasEnumModel.ATUALIZAR_DIRETOR.descricao);
                } else {
                    this.message.mensagemSucesso(MensagensProntasEnumModel.CADASTRO_DIRETOR.descricao);}
                this.fecharForm();
                this.listarDiretores = true;
            },
            error: () => {
                this.message.mensagemErro(MensagensProntasEnumModel.FALHA_DIRETOR.descricao);
            }
        });
    }

    public editarDiretor(id: number): void {
        this.service.findById(id).subscribe({
                next: (response) => {
                    this.formDiretor.patchValue(response);
                },
            }
        );
    }

    public fecharForm(): void {
        this.formDiretor.reset();
        this.resForm.emit();
    }
}
