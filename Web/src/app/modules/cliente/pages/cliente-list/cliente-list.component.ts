import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TituloModalEnum} from "../../../../model/util/titulo-modal-enum.model";
import {ClienteFormComponent} from "../cliente-form/cliente-form.component";
import {ClienteModel} from "../../../../model/cliente.model";

@Component({
    selector: 'app-cliente-list',
    templateUrl: './cliente-list.component.html',
    styleUrls: ['./cliente-list.component.scss']
})
export class ClienteListComponent implements OnInit {

    public tituloModal: string;
    public status: boolean;
    public clienteAtivo: boolean;

    public cliente: ClienteModel;



    @Input() display = false;
    @ViewChild(ClienteFormComponent) formCliente: ClienteFormComponent;
    abaSelecionada: boolean;


    constructor(
    ) {
    }

    ngOnInit(): void {
        this.requisicaoAba();
    }

    public requisicaoAba(): void {
        if(this.abaSelecionada) {
            this.clienteAtivo = true;
        }
        this.clienteAtivo = false;
    }

    public novoSocio(): void {
        this.tituloModal = TituloModalEnum.setTitulo(TituloModalEnum.NOVO_CLIENTE.index).header;
        this.formCliente.formCliente.reset();
        this.display = true;
    }

    public resetarForm(): void {
        this.formCliente.fecharForm();
    }

    public fecharModal(): void {
        if (this.formCliente.listarClientes) {
            // this.listaSociosAtivos();
            // this.listaSociosInativos();
        }
        this.display = false;
    }

}
