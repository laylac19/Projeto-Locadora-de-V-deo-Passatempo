import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AtorRoutingModule} from './ator-routing.module';
import {AtorComponent} from './pages/ator/ator.component';
import {SharedModule} from "../../shared/shared.module";
import {AtorListComponent} from './pages/ator-list/ator-list.component';


@NgModule({
    declarations: [
        AtorComponent,
        AtorListComponent,
    ],
    exports: [
        AtorListComponent
    ],
    imports: [
        CommonModule,
        AtorRoutingModule,
        SharedModule,
    ]
})
export class AtorModule {
}
