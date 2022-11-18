import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ItemListModel} from "../../../../model/list/item-list.model";
import {ItemModel} from "../../../../model/item.model";
import {ItemComponent} from "../item/item.component";
import {ItemService} from "../../../../shared/service/item.service";
import {TituloModalEnum} from "../../../../shared/util/enum/titulo-modal-enum.model";
import {EntidadeUtil} from "../../../../shared/util/entidade-util";
import {ColunaUtil} from "../../../../shared/util/coluna.util";
import {MensagensConfirmacao} from "../../../../shared/util/msgConfirmacaoDialog.util";

@Component({
    selector: 'app-item-list',
    templateUrl: './item-list.component.html',
    styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

    public colunas: ColunaUtil[] = [];
    public listaItens: ItemListModel[] = [];
    public item: ItemModel;

    public tituloModal: string;

    @Input() display = false;
    @ViewChild(ItemComponent) formItem: ItemComponent;

    constructor(
        private itemService: ItemService,
        private confirmMessage: MensagensConfirmacao
    ) {
    }

    ngOnInit(): void {
        this.colunasTabela();
        this.listarTodosItens();
    }

    public colunasTabela(): void {
        this.colunas = [
            new ColunaUtil('numeroSerie', 'Número de Série'),
            new ColunaUtil('titulo', 'Título Filme'),
            new ColunaUtil('data', 'Data Aquisição'),
            new ColunaUtil('nomeTipoItem', 'Tipo'),
            new ColunaUtil('acoes', 'Ações', '132px')
        ]
    }

    public listarTodosItens(): void {
        this.itemService.findAll().subscribe((data) => {
            this.listaItens = data;
        })
    }

    public novoItem(): void {
        this.tituloModal = TituloModalEnum.setTitulo(TituloModalEnum.NOVO_ITEM.index).header;
        this.formItem.formItem.reset();
        this.display = true;
    }

    public editarItem(id: number): void {
        this.display = true;
        this.tituloModal = TituloModalEnum.setTitulo(TituloModalEnum.EDITAR_ITEM.index).header;
        this.formItem.editarItem(id);
    }

    public desativarItem(id: number): void {
        this.itemService.delete(id).subscribe(() => {
            this.listarTodosItens();
        });
    }

    public confirmarAcao(id: number): void {
        this.confirmMessage.confirmarDialog(id, () => this.desativarItem(id), EntidadeUtil.ITEM_TITULO);
    }

    public resetarForm(): void {
        this.formItem.fecharForm();
    }

    public fecharModal(): void {
        if (this.formItem.listarItens) {
            this.listarTodosItens();
        }
        this.display = false;
    }

}
