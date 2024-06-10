import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeanslarPage } from './seanslar.page';

const routes: Routes = [
  {
    path: '',
    component: SeanslarPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeanslarPageRoutingModule {}
