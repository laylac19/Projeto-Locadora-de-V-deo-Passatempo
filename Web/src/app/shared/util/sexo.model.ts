export class SexoModel {
    static readonly FEMININO = new SexoModel(1, 'Feminino');
    static readonly MASCULINO = new SexoModel(2, 'Masculino');
    static readonly NAO_INFORMAR = new SexoModel(3, 'Prefiro não informar');
    static readonly OUTROS = new SexoModel(4, 'Outros');

    static values = [
        SexoModel.FEMININO,
        SexoModel.MASCULINO,
        SexoModel.NAO_INFORMAR,
        SexoModel.OUTROS
    ]

    constructor(
        public index: number,
        public descricao: string
    ) {
    }

    static obterPorIndex(index: number): SexoModel | any {
        return SexoModel.values.find(sexo => sexo.index === index);
    }

    static setClasse(id: number): SexoModel {
        return SexoModel.obterPorIndex(id);
    }
}
