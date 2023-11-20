import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TituloModel} from "../../../../model/titulo.model";
import {TituloService} from "../../../../shared/service/titulo.service";
import {ColunaModel} from "../../../../shared/util/coluna.model";
import {SelectItem} from "primeng/api";
import {ClasseService} from "../../../../shared/service/classe.service";
import {DiretorService} from "../../../../shared/service/diretor.service";
import {AtorService} from "../../../../shared/service/ator.service";
import {VinculoEntidades} from "../../../../model/vinculo-entidade.model";
import {MensagensProntasEnumModel} from "../../../../shared/util/mensagensProntasEnum.model";
import {MensagensUtil} from "../../../../shared/util/mensagens-util";

@Component({
    selector: 'app-titulo',
    templateUrl: './titulo.component.html',
    styleUrls: ['./titulo.component.scss']
})
export class TituloComponent implements OnInit {

    public colunas: ColunaModel[] = [];
    public listaElenco: SelectItem[] = [];

    public categoriasDropDown: SelectItem[];
    public classesDropDown: SelectItem[];
    public diretoresDropDown: SelectItem[];
    public atoresDropDown: SelectItem[];

    public formTituloFilme: FormGroup;
    public novoTituloFilme: TituloModel;
    public vinculo: VinculoEntidades;
    public model: TituloModel;

    public listarTitulos: boolean = false;
    public listarElenco: boolean = false;
    public abilitarBotao: boolean = false;
    public desabilitarCampo: boolean = false;

    public idTitulo: number;
    public idAtor: number;

    @Input() tituloFilmeModel: TituloModel;
    @Input() abilitarAcordion: boolean;
    @Input() abirAcordion: boolean;
    @Output() resForm: EventEmitter<boolean> = new EventEmitter();


    constructor(
        private builder: FormBuilder,
        private tituloService: TituloService,
        private classeService: ClasseService,
        private diretorService: DiretorService,
        private atorService: AtorService,
        private message: MensagensUtil
    ) {
    }

    ngOnInit(): void {
        this.novoFormulario();
        this.colunasTabelaElenco();
        this.preencherDropdowns();
    }

    public colunasTabelaElenco(): void {
        this.colunas = [
            new ColunaModel('label', 'Elenco'),
            new ColunaModel('acoes', 'Ações', '132px')
        ]
    }

    public preencherDropdowns(): void {
        this.dropdownClasses();
        this.dropdownDiretores();
        this.dropdownAtores();
        this.dropdownCategorias();
    }

    public dropdownCategorias(): void {
        this.tituloService.fillMovieCategoryDropdown().subscribe((data)=>{
            this.categoriasDropDown = data;
        });
    }

    public dropdownClasses(): void {
        this.classeService.fillDropdown().subscribe((data)=>{
            this.classesDropDown = data;
        });
    }

    public dropdownDiretores(): void {
        this.diretorService.fillDropdown().subscribe((data)=>{
            this.diretoresDropDown = data;
        });
    }

    public dropdownAtores(): void {
        this.atorService.fillDropdown().subscribe((data)=>{
            this.atoresDropDown = data;
        });
    }

    public novoFormulario(): void {
        this.formTituloFilme = this.builder.group({
            id: [null],
            nome: ['', [Validators.required, Validators.min(5)]],
            ano: ['', [Validators.required]],
            sinopse: ['', [Validators.required, Validators.min(10), Validators.max(400)]],
            idCategoria: ['', [Validators.required]],
            idClasse: ['', [Validators.required]],
            idDiretor: ['', [Validators.required]],
            idAtor: ['', [Validators.required]]
        });
    }


    public salvarFormulario(): void {
        this.novoTituloFilme = this.formTituloFilme.getRawValue();
        this.tituloService.insert(this.novoTituloFilme).subscribe({
            next: (response) => {
                this.idTitulo = response.id;
                this.abilitarAcordion = false;
                this.abirAcordion = true;
                if (this.novoTituloFilme.id) {
                    this.message.mensagemSucesso(MensagensProntasEnumModel.ATUALIZAR_TITULO.descricao);
                } else {
                    this.message.mensagemSucesso(MensagensProntasEnumModel.CADASTRO_TITULO.descricao);}
            },
            error: () => {
                this.message.mensagemErro(MensagensProntasEnumModel.FALHA_ATOR.descricao);
            }
        });
    }

    public editarTituloFilme(id: number): void {
        this.tituloService.findById(id).subscribe({
                next: (response) => {
                    this.formTituloFilme.patchValue(response);
                    this.listarAtoresElenco(id);
                },
            }
        );
    }

    public visualizarDadosTituloFilme(id: number): void {
        this.tituloService.findById(id).subscribe({
                next: (response) => {
                    this.formTituloFilme.patchValue(response);
                    this.listarAtoresElenco(id);
                    this.formTituloFilme.disable();
                },
            }
        );
    }

    public fecharForm(): void {
        this.formTituloFilme.reset();
        this.formTituloFilme.enable();
        this.resForm.emit();
        this.listaElenco = [];
    }

    public adicionarMembroElenco(): void {
        this.idAtor = this.formTituloFilme.get('idAtor')?.value;
        this.vinculo = new VinculoEntidades(this.idTitulo, this.idAtor);
        this.tituloService.insertCastMovie(this.vinculo).subscribe({
            next: () => {
                this.listarElenco = true;
                this.listarAtoresElenco(this.idTitulo);
            }
        });
        this.abilitarBotao = false;
    }

    public listarAtoresElenco(idFilme: number): void {
        this.atorService.findCastMovie(idFilme).subscribe((dataElenco) => {
            this.listaElenco = dataElenco;
        });
    }

    public retirarMembroElenco(rowData: any): void {
        this.listaElenco = this.listaElenco.slice(rowData.value);
    }
}
