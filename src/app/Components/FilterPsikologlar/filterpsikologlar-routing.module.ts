import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilterPsikologlarPage } from './filterpsikologlar.page';

const routes: Routes = [
  {
    path: '',
    component: FilterPsikologlarPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilterPsikologlarRoutingModule {}
