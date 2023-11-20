import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LocacaoRoutingModule} from './locacao-routing.module';
import {LocacaoComponent} from './pages/locacao/locacao.component';
import {LocacaoListComponent} from './pages/locacao-list/locacao-list.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
    declarations: [
        LocacaoComponent,
        LocacaoListComponent,
    ],
    imports: [
        CommonModule,
        LocacaoRoutingModule,
        SharedModule
    ]
})
export class LocacaoModule {
}
