import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ColunaModel} from "../../../../shared/util/coluna.model";
import {LocacaoListModel} from "../../../../model/list/locacao-list.model";
import {LocacaoModel} from "../../../../model/locacao.model";
import {LocacaoComponent} from "../locacao/locacao.component";
import {TituloModalEnum} from "../../../../shared/util/titulo-modal-enum.model";
import {EntidadeUtil} from "../../../../shared/util/entidade-util";
import {MensagensConfirmacao} from "../../../../shared/util/msgConfirmacaoDialog.util";
import {ItemModel} from "../../../../model/item.model";
import {LocacaoService} from "../../../../shared/service/locacao.service";

@Component({
    selector: 'app-locacao-list',
    templateUrl: './locacao-list.component.html',
    styleUrls: ['./locacao-list.component.scss']
})
export class LocacaoListComponent implements OnInit {

    public colunas: ColunaModel[] = [];
    public listaMovimentacaoLocacao: LocacaoListModel[] = [];
    public items: ItemModel[] = [];
    public locacao: LocacaoModel;

    public tituloModal: string;
    public filterItem: string;

    @Input() display = false;
    @ViewChild(LocacaoComponent) formLocacao: LocacaoComponent;

    constructor(
        private confirmMessage: MensagensConfirmacao,
        private locacaoService: LocacaoService,
    ) {
    }

    ngOnInit(): void {
        this.colunasTabela();
        this.listarTodasLocacoes();
    }

    public colunasTabela(): void {
        this.colunas = [
            new ColunaModel('nomeCliente', 'Cliente'),
            new ColunaModel('numeroItem', 'Nº Série Item'),
            new ColunaModel('dtLocacao', 'Data Locação'),
            new ColunaModel('dtDevolucaoPrevista', 'Dt. Devolução Prevista'),
            new ColunaModel('status', 'Status'),
            new ColunaModel('dtDevolucaoEfetiva', 'Dt. Devolução'),
            new ColunaModel('valorCobrado', 'Valor Cobrado'),
            new ColunaModel('multaCobrada', 'Multa Cobrada'),
            new ColunaModel('acoes', 'Ações', '132px')
        ]
    }

    public listarTodasLocacoes(): void {
        this.locacaoService.findAll().subscribe((data) => {
            this.listaMovimentacaoLocacao = data;
        });
    }

    public novaLocacao(): void {
        this.tituloModal = TituloModalEnum.setTitulo(TituloModalEnum.NOVA_LOCACAO.index).header;
        this.formLocacao.formLocacao.reset();
        this.display = true;
    }

    public visualizarDados(id: number): void {
        this.display = true;
        this.tituloModal = TituloModalEnum.setTitulo(TituloModalEnum.VISUALIZAR_MOVIMENTACAO.index).header;
        this.formLocacao.visualizarLocacao(id);
    }

    public ralizarDevolucaoItem(id: number): void {
        this.display = true;
        this.tituloModal = TituloModalEnum.setTitulo(TituloModalEnum.EDITAR_LOCACAO.index).header;
        this.formLocacao.novaDevolucao(id);
    }

    public editarLocacao(id: number): void {
        this.display = true;
        this.tituloModal = TituloModalEnum.setTitulo(TituloModalEnum.EDITAR_LOCACAO.index).header;
        this.formLocacao.editarForm(id);
    }

    public desativarLocacao(id: number) {
        this.locacaoService.delete(id).subscribe(()=> {
            this.listarTodasLocacoes();
        });
    }

    public resetarForm(): void {
        this.formLocacao.fecharForm();
    }

    public confirmarAcao(id: number): void {
        this.confirmMessage.confirmarDialog(id, () => this.desativarLocacao(id), EntidadeUtil.LOCACAO);
    }

    public fecharModal(): void {
        if (this.formLocacao.listarLocacoes) {
            this.listarTodasLocacoes();
        }
        this.display = false;
    }
}
