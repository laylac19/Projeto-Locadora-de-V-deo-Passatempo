export class ControleAcervoEnumModel {
    static readonly CONTROLE = new ControleAcervoEnumModel(0, 'Controle');
    static readonly ATOR = new ControleAcervoEnumModel(1, 'Atores');
    static readonly CLASSE = new ControleAcervoEnumModel(2, 'Classes');
    static readonly DIRETOR = new ControleAcervoEnumModel(3, 'Diretores');
    static readonly ITEM = new ControleAcervoEnumModel(4, 'Itens');
    static readonly TITULO = new ControleAcervoEnumModel(5, 'Titulos');


    static values = [
        ControleAcervoEnumModel.CONTROLE,
        ControleAcervoEnumModel.ATOR,
        ControleAcervoEnumModel.CLASSE,
        ControleAcervoEnumModel.DIRETOR,
        ControleAcervoEnumModel.ITEM,
        ControleAcervoEnumModel.TITULO
    ];

    constructor(
        public index: number,
        public descricao: string
    ) {
    }

    static obterPorIndex(index: number): ControleAcervoEnumModel | any {
        return ControleAcervoEnumModel.values.find(acervo => acervo.index === index);
    }

    static setClasse(id: number): ControleAcervoEnumModel {
        return ControleAcervoEnumModel.obterPorIndex(id);
    }
}
