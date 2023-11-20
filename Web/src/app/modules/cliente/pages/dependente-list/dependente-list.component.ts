import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ColunaModel} from "../../../../shared/util/coluna.model";
import {ClienteListModel} from "../../../../model/list/cliente-list.model";
import {ClienteModel} from "../../../../model/cliente.model";
import {ClienteFormComponent} from "../cliente-form/cliente-form.component";
import {ClienteService} from "../../../../shared/service/cliente.service";
import {EntidadeUtil} from "../../../../shared/util/entidade-util";
import {MensagensConfirmacao} from "../../../../shared/util/msgConfirmacaoDialog.util";

@Component({
    selector: 'app-dependente-list',
    templateUrl: './dependente-list.component.html',
    styleUrls: ['./dependente-list.component.scss']
})
export class DependenteListComponent implements OnInit {

    public colunas: ColunaModel[] = [];
    public listaDependentesAtivos: ClienteListModel[] = [];
    public listaDependentesInativos: ClienteListModel[] = [];
    public dependete: ClienteModel;

    public tituloModal: string;
    public ativos: boolean = true;

    @Input() display = false;
    @Input() public configuracaoListagem?: boolean;
    @ViewChild(ClienteFormComponent) formCliente: ClienteFormComponent;

    constructor(
        private clienteService: ClienteService,
        private confirmMessage: MensagensConfirmacao
    ) {
    }

    ngOnInit(): void {
        this.colunasTabela();
        this.listarDependentes();
    }

    public colunasTabela(): void {
        this.colunas = [
            new ColunaModel('socio', 'Nome Sócio'),
            new ColunaModel('numInscricao', 'Nº Inscrição'),
            new ColunaModel('nome', 'Nome Dependente'),
            new ColunaModel('dataNascimento', 'Data Nascimento'),
            new ColunaModel('acoes', 'Ações', '132px')
        ]
    }

    public listarDependentes(): boolean {
        if(this.configuracaoListagem === true) {
            this.listarDependentesInativos();
            return this.ativos = false;
        }
        this.listarDependentesAtivos();
        return this.ativos = true;
    }

    public listarDependentesAtivos(): void {
        this.clienteService.findAllDependents(true).subscribe((data) => {
            this.listaDependentesAtivos = data;
        })
    }

    public listarDependentesInativos(): void {
        this.clienteService.findAllDependents(false).subscribe((data) => {
            this.listaDependentesInativos = data;
        })
    }

    public desativarDependente(id: number): void {
        this.clienteService.delete(id).subscribe(() => {
            this.listarDependentesAtivos();
            this.listarDependentesInativos();
        });
    }

    public confirmarAcao(id: number): void {
        this.confirmMessage.confirmarDialog(id, () => this.desativarDependente(id), EntidadeUtil.CLIENTE);
    }

    public visualizarDados($event: number) {

    }

    public reativarDependente($event: number) {

    }
}
