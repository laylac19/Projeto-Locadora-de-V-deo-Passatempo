import {Component, Input} from '@angular/core';
import {OpcaoMenuModel} from 'src/app/shared/models/opcao-menu.model';
import {SidemenuModel} from 'src/app/shared/models/sidemenu.model';
import {Router} from "@angular/router";

@Component({
    selector: 'app-sidemenu',
    templateUrl: './sidemenu.component.html',
    styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent {
    @Input() public configuracaoMenuLateral?: SidemenuModel;

    @Input() public opcoesControleAverco: OpcaoMenuModel[] = [
        new OpcaoMenuModel('pi pi-home', 'Início', 'Início',
            () => this.router.navigateByUrl('/Filmes')),
        new OpcaoMenuModel('bi bi-file-earmark-person', 'Atores', 'Atores',
            () => this.router.navigateByUrl('/Atores')),
        new OpcaoMenuModel('bi bi-ticket-detailed', 'Classes', 'Classes',
            () => this.router.navigateByUrl('/Classes')),
        new OpcaoMenuModel('bi bi-person-video3', 'Diretores', 'Diretores',
            () => this.router.navigateByUrl('/Diretores')),
        new OpcaoMenuModel('bi bi-film', 'Filmes', 'Título Filmes',
            () => this.router.navigateByUrl('/Filmes')),
        new OpcaoMenuModel('bi bi-upc-scan', 'Itens', 'Itens',
            () => this.router.navigateByUrl('/Itens')),
    ];

    @Input() public opcoesAtendimentoCliente: OpcaoMenuModel[] = [
        new OpcaoMenuModel('pi pi-home', 'Início', 'Início',
            () => this.router.navigateByUrl('/Locacao')),
        new OpcaoMenuModel('bi bi-person-plus', 'Cadastrar Clientes', 'Cadastrar Clientes',
            () => this.router.navigateByUrl('/Clientes')),
        new OpcaoMenuModel('bi bi-cart4', 'Locações e Devoluções', 'Efetuar Movimentação',
            () => this.router.navigateByUrl('/Locacao')),
    ];


    constructor(
        private router: Router
    ) {
    }

    public estaVisivel(): boolean {
        if (this.configuracaoMenuLateral) {
            return this.configuracaoMenuLateral.visivel;
        }
        return false;
    }
}
