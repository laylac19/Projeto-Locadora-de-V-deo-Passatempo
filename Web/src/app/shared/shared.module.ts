import { NgModule } from '@angular/core';
import { PRIMENG_IMPORTS } from './imports/primeng.imports';
import { ANGULAR_IMPORTS } from './imports/angular.imports';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TabelaGenericaComponent} from "./components/tabela-generica/tabela-generica.component";

@NgModule({
    declarations: [TabelaGenericaComponent],
    imports: [
        PRIMENG_IMPORTS,
        ANGULAR_IMPORTS,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [],
    exports: [
        PRIMENG_IMPORTS,
        ANGULAR_IMPORTS,
        FormsModule,
        ReactiveFormsModule,
        TabelaGenericaComponent
    ]
})
export class SharedModule { }
