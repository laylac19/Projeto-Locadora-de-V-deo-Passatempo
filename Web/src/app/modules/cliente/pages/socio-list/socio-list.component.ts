import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ColunaModel} from "../../../../shared/util/coluna.model";
import {ClienteService} from "../../../../shared/service/cliente.service";
import {TituloModalEnum} from "../../../../shared/util/titulo-modal-enum.model";
import {EntidadeUtil} from "../../../../shared/util/entidade-util";
import {SocioListModel} from "../../../../model/list/socio-list.model";
import {SocioModel} from "../../../../model/socio.model";
import {SocioFormComponent} from "../socio-form/socio-form.component";
import {MensagensConfirmacao} from "../../../../shared/util/msgConfirmacaoDialog.util";

@Component({
    selector: 'app-socio-list',
    templateUrl: './socio-list.component.html',
    styleUrls: ['./socio-list.component.scss']
})
export class SocioListComponent implements OnInit {

    public colunas: ColunaModel[] = [];
    public listaSociosAtivos: SocioListModel[] = [];
    public listaSociosInativos: SocioListModel[] = [];
    public socio: SocioModel;

    public tituloModal: string;
    public ativos: boolean = true;

    @Input() display = false;
    @Input() public configuracaoListagem?: boolean;
    @ViewChild(SocioFormComponent) formSocio: SocioFormComponent;

    constructor(
        private clienteService: ClienteService,
        private confirmMessage: MensagensConfirmacao
    ) {
    }

    ngOnInit(): void {
        this.colunasTabela();
        this.listarSocios();
    }

    public colunasTabela(): void {
        this.colunas = [
            new ColunaModel('numeroInscricao', 'Nº Inscrição'),
            new ColunaModel('nome', 'Nome Cliente'),
            new ColunaModel('dataNascimento', 'Data Nascimento'),
            new ColunaModel('cpf', 'CPF'),
            new ColunaModel('telefone', 'Telefone'),
            new ColunaModel('acoes', 'Ações', '132px')
        ]
    }

    public listarSocios(): boolean {
        if(this.configuracaoListagem === true) {
            this.listarSociosInativos();
            return this.ativos = false;
        }
        this.listarSociosAtivos();
        return this.ativos = true;
    }

    public listarSociosAtivos(): void {
        this.clienteService.findAllPartners(true).subscribe((data) => {
            this.listaSociosAtivos = data;
        })
    }

    public listarSociosInativos(): void {
        this.clienteService.findAllPartners(false).subscribe((data) => {
            this.listaSociosInativos = data;
        })
    }

    public novoSocio(): void {
        this.tituloModal = TituloModalEnum.setTitulo(TituloModalEnum.NOVO_SOCIO.index).header;
        this.display = true;
    }

    public editarSocio(id: number): void {
        this.display = true;
        this.tituloModal = TituloModalEnum.setTitulo(TituloModalEnum.EDITAR_SOCIO.index).header;
        this.formSocio.editarForm(id);
    }

    public visualizarDadosSocio(id: number): void {
        this.display = true;
        this.tituloModal = TituloModalEnum.setTitulo(TituloModalEnum.VISUALIZAR_SOCIO.index).header;
        this.formSocio.visualizarDadosSocio(id);
    }

    public desativarSocio(id: number): void {
        this.clienteService.delete(id).subscribe(() => {
            this.listarSociosAtivos();
            this.listarSociosInativos();
        });
    }

    public confirmarAcao(id: number): void {
        this.confirmMessage.confirmarDialog(id, () => this.desativarSocio(id), EntidadeUtil.CLIENTE);
    }

    public resetarForm(): void {
        this.formSocio.fecharForm();
    }

    public fecharModal(): void {
        if (this.formSocio.listarSocios) {
            this.listarSociosAtivos();
        }
        this.display = false;
    }

    rativarSocio($event: number) {

    }
}
