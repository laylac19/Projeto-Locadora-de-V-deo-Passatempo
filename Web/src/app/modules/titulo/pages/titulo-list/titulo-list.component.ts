import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TituloListModel} from "../../../../model/list/titulo-list.model";
import {TituloModel} from "../../../../model/titulo.model";
import {TituloComponent} from "../titulo/titulo.component";
import {TituloModalEnum} from "../../../../shared/util/titulo-modal-enum.model";
import {TituloService} from "../../../../shared/service/titulo.service";
import {EntidadeUtil} from "../../../../shared/util/entidade-util";
import {ColunaModel} from "../../../../shared/util/coluna.model";
import {MensagensConfirmacao} from "../../../../shared/util/msgConfirmacaoDialog.util";

@Component({
    selector: 'app-titulo-list',
    templateUrl: './titulo-list.component.html',
    styleUrls: ['./titulo-list.component.scss']
})
export class TituloListComponent implements OnInit {

    public colunas: ColunaModel[] = [];
    public listaTitulosFilmes: TituloListModel[] = [];
    public tituloFilme: TituloModel;

    public tituloModal: string;

    @Input() displayFormTitulo = false;
    @ViewChild(TituloComponent) formTituloFilme: TituloComponent;

    constructor(
        private tituloService: TituloService,
        private confirmMessage: MensagensConfirmacao
    ) {
    }

    ngOnInit(): void {
        this.colunasTabela();
        this.listarTodosTitulosFilmes();
    }

    public colunasTabela(): void {
        this.colunas = [
            new ColunaModel('nome', 'Nome Título'),
            new ColunaModel('ano', 'Ano Lançamento'),
            new ColunaModel('nomeClasse', 'Classse'),
            new ColunaModel('nomeCategoria', 'Categoria'),
            new ColunaModel('acoes', 'Ações', '132px')
        ]
    }

    public listarTodosTitulosFilmes(): void {
        this.tituloService.findAll().subscribe((data) => {
            this.listaTitulosFilmes = data;
        })
    }

    public novoTituloFilme(): void {
        this.tituloModal = TituloModalEnum.setTitulo(TituloModalEnum.NOVO_TITULO.index).header;
        this.formTituloFilme.formTituloFilme.reset();
        this.displayFormTitulo = true;
    }

    public editarTitulo(id: number): void {
        this.displayFormTitulo = true;
        this.tituloModal = TituloModalEnum.setTitulo(TituloModalEnum.EDITAR_TITULO.index).header;
        this.formTituloFilme.editarTituloFilme(id);
    }

    public desativarTitulo(id: number): void {
        this.tituloService.delete(id).subscribe(() => {
            this.listarTodosTitulosFilmes();
        });
    }

    public confirmarAcao(id: number): void {
        this.confirmMessage.confirmarDialog(id, () => this.desativarTitulo(id), EntidadeUtil.TITULO);
    }

    public resetarForm(): void {
        this.formTituloFilme.fecharForm();
    }

    public fecharModal(): void {
        if (!this.formTituloFilme.listarTitulos) {
            this.displayFormTitulo = false;
            this.listarTodosTitulosFilmes();
        }

    }

    visualizarTitulo(id: number) {
        this.displayFormTitulo = true;
        this.tituloModal = TituloModalEnum.setTitulo(TituloModalEnum.VISUALIZAR_TITULO.index).header;
        this.formTituloFilme.visualizarDadosTituloFilme(id);
    }
}
