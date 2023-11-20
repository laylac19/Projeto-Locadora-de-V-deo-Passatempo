import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LocacaoListComponent} from "./pages/locacao-list/locacao-list.component";

const routes: Routes = [
    {path:'', component: LocacaoListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocacaoRoutingModule { }
