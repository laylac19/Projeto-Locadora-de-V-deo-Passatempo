export class TituloModalEnum {
    static readonly NOVO = new TituloModalEnum(0, 'Novo');
    static readonly VISUALIZAR = new TituloModalEnum(1, 'Visualizar Dados');
    static readonly EDITAR = new TituloModalEnum(2, 'Editar');

    static readonly NOVO_ATOR = new TituloModalEnum(3, 'Novo Ator');
    static readonly EDITAR_ATOR = new TituloModalEnum(4, 'Editar Ator');

    static readonly NOVA_CLASSE = new TituloModalEnum(5, 'Nova Classe');
    static readonly EDITAR_CLASSE = new TituloModalEnum(6, 'Editar Classe');

    static readonly NOVO_DIRETOR = new TituloModalEnum(7, 'Novo Diretor');
    static readonly EDITAR_DIRETOR = new TituloModalEnum(8, 'Editar Diretor');

    static readonly NOVO_TITULO = new TituloModalEnum(9, 'Novo Filme');
    static readonly EDITAR_TITULO = new TituloModalEnum(10, 'Editar Filme');
    static readonly VISUALIZAR_TITULO = new TituloModalEnum(11, 'Visualizar Dados do Filme');

    static readonly NOVO_ITEM = new TituloModalEnum(12, 'Novo Item');
    static readonly EDITAR_ITEM = new TituloModalEnum(13, 'Editar Item');

    static readonly NOVO_CLIENTE = new TituloModalEnum(14, 'Novo Cliente');
    static readonly EDITAR_CLIENTE = new TituloModalEnum(15, 'Editar Cliente');

    static readonly NOVO_SOCIO = new TituloModalEnum(16, 'Novo Sócio');
    static readonly VISUALIZAR_SOCIO = new TituloModalEnum(17, 'Visualizar Dados Sócio');
    static readonly EDITAR_SOCIO = new TituloModalEnum(18, 'Editar Sócio');

    static readonly NOVA_LOCACAO = new TituloModalEnum(19, 'Nova Locação');
    static readonly NOVA_DEVOLUCAO = new TituloModalEnum(20, 'Nova Devolução');
    static readonly VISUALIZAR_MOVIMENTACAO = new TituloModalEnum(21, 'Visualizar Movimentação');
    static readonly EDITAR_LOCACAO = new TituloModalEnum(22, 'Editar Locação');


    static values = [
        TituloModalEnum.NOVO,
        TituloModalEnum.VISUALIZAR,
        TituloModalEnum.EDITAR,
        TituloModalEnum.NOVO_ATOR,
        TituloModalEnum.EDITAR_ATOR,
        TituloModalEnum.NOVA_CLASSE,
        TituloModalEnum.EDITAR_CLASSE,
        TituloModalEnum.NOVO_DIRETOR,
        TituloModalEnum.EDITAR_DIRETOR,
        TituloModalEnum.NOVO_TITULO,
        TituloModalEnum.EDITAR_TITULO,
        TituloModalEnum.VISUALIZAR_TITULO,
        TituloModalEnum.NOVO_ITEM,
        TituloModalEnum.EDITAR_ITEM,
        TituloModalEnum.NOVO_CLIENTE,
        TituloModalEnum.EDITAR_CLIENTE,
        TituloModalEnum.NOVO_SOCIO,
        TituloModalEnum.VISUALIZAR_SOCIO,
        TituloModalEnum.EDITAR_SOCIO,
        TituloModalEnum.NOVA_LOCACAO,
        TituloModalEnum.NOVA_DEVOLUCAO,
        TituloModalEnum.VISUALIZAR_MOVIMENTACAO,
        TituloModalEnum.EDITAR_LOCACAO
    ];

    private constructor(
        public index: number,
        public header: string,
    ) {
    }

    static obterPorIndex(index: number): TituloModalEnum | any {
        return TituloModalEnum.values.find(titulo => titulo.index === index);
    }

    static setTitulo(id: number): TituloModalEnum {
        return TituloModalEnum.obterPorIndex(id);
    }
}
