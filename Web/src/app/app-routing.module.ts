import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: 'Atores', loadChildren: () => import('./modules/ator/ator.module').then(m => m.AtorModule)},
    {path: 'Classes', loadChildren: () => import('./modules/classe/classe.module').then(m => m.ClasseModule)},
    {path: 'Clientes', loadChildren: () => import('./modules/cliente/cliente.module').then(m => m.ClienteModule)},
    {path: 'Diretores', loadChildren: () => import('./modules/diretor/diretor.module').then(m => m.DiretorModule)},
    {path: 'Filmes', loadChildren: () => import('./modules/titulo/titulo.module').then(m => m.TituloModule)},
    {path: 'Itens', loadChildren: () => import('./modules/item/item.module').then(m => m.ItemModule)},
    {path: 'Locacao', loadChildren: () => import('./modules/locacao/locacao.module').then(m => m.LocacaoModule)},
    {path: 'Titulos', loadChildren: () => import('./modules/titulo/titulo.module').then(m => m.TituloModule)},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
