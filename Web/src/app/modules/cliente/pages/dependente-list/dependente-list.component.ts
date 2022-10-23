import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ColunaModel} from "../../../../model/util/coluna.model";
import {ClienteListModel} from "../../../../model/cliente-list.model";
import {ClienteModel} from "../../../../model/cliente.model";
import {ClienteFormComponent} from "../cliente-form/cliente-form.component";
import {ClienteService} from "../../../../shared/service/cliente.service";
import {ConfirmationService} from "primeng/api";
import {TituloModalEnum} from "../../../../model/util/titulo-modal-enum.model";
import {EntidadeUtil} from "../../../../shared/util/entidade-util";

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
    public ativos: boolean;

    @Input() display = false;
    @Input() public configuracaoListagem?: boolean;
    @ViewChild(ClienteFormComponent) formCliente: ClienteFormComponent;

    constructor(
        private clienteService: ClienteService,
        private confirmMessage: ConfirmationService
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
            new ColunaModel('nomeCliente', 'Nome Dependente'),
            new ColunaModel('dtNascimento', 'Data Nascimento'),
            new ColunaModel('cpf', 'CPF'),
            new ColunaModel('telefone', 'Telefone'),
            new ColunaModel('acoes', 'Ações', '132px')
        ]
    }

    public listarDependentes(): void {
        if(this.configuracaoListagem) {
            this.listarDependentesAtivos();
            this.ativos = true;
        }
        this.listarDependentesInativos();
        this.ativos = false;
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

    public novoDependente(): void {
        this.tituloModal = TituloModalEnum.setTitulo(TituloModalEnum.NOVO_CLIENTE.index).header;
        this.formCliente.formCliente.reset();
        this.display = true;
    }

    public editarDependente(id: number): void {
        this.display = true;
        this.tituloModal = TituloModalEnum.setTitulo(TituloModalEnum.EDITAR_CLIENTE.index).header;
        this.formCliente.editarForm(id);
    }

    public desativarDependente(id: number): void {
        this.clienteService.delete(id).subscribe(() => {
            this.listarDependentesAtivos();
            this.listarDependentesInativos();
        });
    }

    public confirmarAcao(id: number): void {
        this.confirmarDialog(id, () => this.desativarDependente(id), EntidadeUtil.CLIENTE);
    }

    public confirmarDialog(id: number, alterarSituacao: () => void, entidade: EntidadeUtil): void {
        this.confirmMessage.confirm({
            header: 'Confirmação',
            message: 'Deseja desativar esse(a) ' + entidade.descricao + ' ?',
            acceptLabel: 'Sim',
            rejectLabel: 'Cancelar',
            accept: alterarSituacao
        });
    }

    public resetarForm(): void {
        this.formCliente.fecharForm();
    }

    public fecharModal(): void {
        if (this.formCliente.listarClientes) {
            this.listarDependentesAtivos();
            this.listarDependentesInativos();
        }
        this.display = false;
    }
}
