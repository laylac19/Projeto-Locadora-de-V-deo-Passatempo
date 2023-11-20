import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ClasseModel} from "../../../../model/classe.model";
import {ClasseComponent} from "../classe/classe.component";
import {TituloModalEnum} from "../../../../shared/util/titulo-modal-enum.model";
import {ClasseService} from "../../../../shared/service/classe.service";
import {ClasseListModel} from "../../../../model/list/classe-list.model";
import {EntidadeUtil} from "../../../../shared/util/entidade-util";
import {ColunaModel} from "../../../../shared/util/coluna.model";
import {MensagensConfirmacao} from "../../../../shared/util/msgConfirmacaoDialog.util";

@Component({
    selector: 'app-classe-list',
    templateUrl: './classe-list.component.html',
    styleUrls: ['./classe-list.component.scss']
})
export class ClasseListComponent implements OnInit {

    public colunas: ColunaModel[] = [];
    public listaClasse: ClasseListModel[] = [];

    public classe: ClasseModel;

    public tituloModal: string;

    @Input() display = false;
    @ViewChild(ClasseComponent) formClasse: ClasseComponent;

    constructor(
        private classeService: ClasseService,
        private confirmMessage: MensagensConfirmacao,
    ) {
    }

    ngOnInit(): void {
        this.colunasTabela();
        this.buscarClasse();
    }

    public colunasTabela(): void {
        this.colunas = [
            new ColunaModel('nomeClasse', 'Nome Classe'),
            new ColunaModel('valor', 'Valor'),
            new ColunaModel('prazoDevolucao', 'Prazo De Devolução'),
            new ColunaModel('acoes', 'Ações', '132px')
        ]
    }

    public buscarClasse(): void {
        this.classeService.findAll().subscribe((data) => {
            this.listaClasse = data;
        })
    }

    public novaClasse(): void {
        this.tituloModal = TituloModalEnum.setTitulo(TituloModalEnum.NOVA_CLASSE.index).header;
        this.formClasse.formClasse.reset();
        this.display = true;
    }

    public editarClasse(id: number): void {
        this.display = true;
        this.tituloModal = TituloModalEnum.setTitulo(TituloModalEnum.EDITAR_CLASSE.index).header;
        this.formClasse.editarForm(id);
    }

    public desativarCasse(id: number): void {
        this.classeService.delete(id).subscribe(() => {
            this.buscarClasse();
        });
    }

    public confirmarAcao(id: number): void {
        this.confirmMessage.confirmarDialog(id, () => this.desativarCasse(id), EntidadeUtil.CLASSE);
    }

    public resetarForm(): void {
        this.formClasse.fecharForm();
    }

    public fecharModal(): void {
        if (this.formClasse.listarClasses) {
            this.buscarClasse();
        }
        this.display = false;
    }
}
