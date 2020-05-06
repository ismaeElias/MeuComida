import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantePage } from './restaurante.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantePage
  },
  {
    path: 'cadastro-restaurante',
    loadChildren: () => import('./cadastro-restaurante/cadastro-restaurante.module').then( m => m.CadastroRestaurantePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestauranteDetailPageRoutingModule {}