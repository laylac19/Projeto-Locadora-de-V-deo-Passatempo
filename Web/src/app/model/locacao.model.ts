export class LocacaoModel {
    public id: number;
    public dtLocacao: Date;
    public dtDevolucaoPrevista: Date;
    public valorCobrado: number;
    public dtDevolucaoEfetiva: Date;
    public multaCobrada: number;
    public idCliente: number;
    public idItem: number;
    public status: boolean;
}
