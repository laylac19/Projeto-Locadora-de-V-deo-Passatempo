import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AtorModel} from "../../../../model/ator.model";
import {AtorComponent} from "../ator/ator.component";
import {TituloModalEnum} from "../../../../shared/util/titulo-modal-enum.model";
import {AtorListModel} from "../../../../model/list/ator-list.model";
import {AtorService} from "../../../../shared/service/ator.service";
import {EntidadeUtil} from "../../../../shared/util/entidade-util";
import {ColunaModel} from "../../../../shared/util/coluna.model";
import {MensagensConfirmacao} from "../../../../shared/util/msgConfirmacaoDialog.util";

@Component({
    selector: 'app-ator-list',
    templateUrl: './ator-list.component.html',
    styleUrls: ['./ator-list.component.scss']
})
export class AtorListComponent implements OnInit {

    public colunas: ColunaModel[] = [];
    public listaAtor: AtorListModel[] = [];
    public ator: AtorModel;

    public tituloModal: string;

    @Input() display = false;
    @ViewChild(AtorComponent) formAtor: AtorComponent;

    constructor(
        private atorService: AtorService,
        private confirmMessage: MensagensConfirmacao,
    ) {
    }

    ngOnInit(): void {
        this.colunasTabela();
        this.listarTodosAtores();
    }

    public colunasTabela(): void {
        this.colunas = [
            new ColunaModel('nomeAtor', 'Nome Ator'),
            new ColunaModel('acoes', 'Ações', '132px')
        ]
    }

    public listarTodosAtores(): void {
        this.atorService.findAll().subscribe((data) => {
            this.listaAtor = data;
        })
    }

    public novoAtor(): void {
        this.tituloModal = TituloModalEnum.setTitulo(TituloModalEnum.NOVO_ATOR.index).header;
        this.formAtor.formAtor.reset();
        this.display = true;
    }

    public editarAtor(id: number): void {
        this.display = true;
        this.tituloModal = TituloModalEnum.setTitulo(TituloModalEnum.EDITAR_ATOR.index).header;
        this.formAtor.editarAtor(id);
    }

    public desativarAtor(id: number): void {
        this.atorService.delete(id).subscribe(() => {
            this.listarTodosAtores();
        });
    }

    public confirmarAcao(id: number): void {
        this.confirmMessage.confirmarDialog(id, () => this.desativarAtor(id), EntidadeUtil.ATOR);
    }

    public resetarForm(): void {
        this.formAtor.fecharForm();
    }

    public fecharModal(): void {
        if (this.formAtor.listarAtores) {
            this.listarTodosAtores();
        }
        this.display = false;
    }
}
