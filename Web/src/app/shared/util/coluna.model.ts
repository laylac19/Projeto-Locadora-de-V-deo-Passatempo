export class ColunaModel {
    public field: string;
    public header: string;

    constructor(field: string, header: string, public width ?: string, public height ?: string) {
        this.field = field;
        this.header = header;
    }
}
