export class AtendimentoClienteEnum {
    static readonly CLIENTE = new AtendimentoClienteEnum(0, 'Clientes');
    static readonly LOCACAO = new AtendimentoClienteEnum(1, 'Locacao');
    static readonly DEVOLUCAO = new AtendimentoClienteEnum(2, 'Devolucao');

    static values = [
        AtendimentoClienteEnum.CLIENTE,
        AtendimentoClienteEnum.LOCACAO,
        AtendimentoClienteEnum.DEVOLUCAO
    ];

    constructor(
        public index: number,
        public descricao: string
    ) {
    }

    static obterPorIndex(index: number): AtendimentoClienteEnum | any {
        return AtendimentoClienteEnum.values.find(acervo => acervo.index === index);
    }

    static setClasse(id: number): AtendimentoClienteEnum {
        return AtendimentoClienteEnum.obterPorIndex(id);
    }
}
