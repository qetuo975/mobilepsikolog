import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsikologlarPage } from './psikologlar.page';

const routes: Routes = [
  {
    path: '',
    component: PsikologlarPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PsikologlarPageRoutingModule {}
