import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AtendimentoClienteEnum} from "../../shared/util/atendimento-cliente-enum";
import {ControleAcervoEnumModel} from "../../shared/util/controle-acervo-enum.model";

@Component({
    selector: 'app-menu-atendimento-cliente',
    templateUrl: './menu-atendimento-cliente.component.html',
    styleUrls: ['./menu-atendimento-cliente.component.scss']
})
export class MenuAtendimentoClienteComponent implements OnInit {
    public cardComponent: string = 'Cliente';

    constructor(
        private router: Router
    ) {
    }

    ngOnInit(): void {
    }

    public mudarTipoAtendimentoPorURL(idTipoAtendimento: number): void {
        this.cardComponent = AtendimentoClienteEnum.setClasse(idTipoAtendimento).descricao;
        this.router.navigateByUrl('/' + this.cardComponent);
    }

    public navegarConsultaTitulo(idTipoAcervo: number): void {
        this.cardComponent = ControleAcervoEnumModel.setClasse(idTipoAcervo).descricao;
        this.router.navigateByUrl('/' + this.cardComponent);
    }

}
