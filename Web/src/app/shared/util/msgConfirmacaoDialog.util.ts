import {Injectable} from '@angular/core';
import {ConfirmationService} from "primeng/api";
import {EntidadeUtil} from "./entidade-util";

@Injectable()
export class MensagensConfirmacao {

    constructor(private confirmMessage: ConfirmationService) {
    }

    public confirmarDialogDevolucao(id: number, alterarSituacao: () => void, entidade: EntidadeUtil): void {
        this.confirmMessage.confirm({
            header: 'Confirmação',
            message: 'Deseja Realizar a Devolucao Desse ' + entidade.descricao + ' ?',
            acceptLabel: 'Sim',
            rejectLabel: 'Cancelar',
            accept: alterarSituacao
        });
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
}
