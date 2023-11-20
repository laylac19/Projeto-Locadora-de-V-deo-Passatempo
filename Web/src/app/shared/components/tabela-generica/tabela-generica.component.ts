import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ColunaModel} from "../../util/coluna.model";

@Component({
    selector: 'app-tabela-generica',
    templateUrl: './tabela-generica.component.html',
    styleUrls: ['./tabela-generica.component.scss']
})
export class TabelaGenericaComponent implements OnInit {

    @Input() colunas: ColunaModel[] = [];
    @Input() dados: any;
    @Input() rows: number;
    @Input() paginator: boolean;

    @Input() editarDado: boolean;
    @Input() desativarDado: boolean;
    @Input() reativarDado: boolean;
    @Input() visualizarDado: boolean;

    @Output() public abrirModalHabilitado: EventEmitter<number> = new EventEmitter<number>();
    @Output() public abrirModalVisualizar: EventEmitter<number> = new EventEmitter<number>();
    @Output() public deletarDado: EventEmitter<number> = new EventEmitter<number>();
    @Output() public reativar: EventEmitter<number> = new EventEmitter<number>();

    constructor() {
    }

    ngOnInit(): void {
    }

    campoDataItem(coluna: string): boolean {
        return coluna === 'data';
    }

    campoDatanascimento(coluna: string): boolean {
        return coluna === 'dataNascimento';
    }

    campoValor(coluna: string): boolean {
        return coluna === 'valor';
    }

    campoPrazoDevolucao(coluna: string): boolean {
        return coluna === 'prazoDevolucao';
    }

    campoNumeroSerie(coluna: string): boolean {
        return coluna === 'numeroSerie'
    }
}
