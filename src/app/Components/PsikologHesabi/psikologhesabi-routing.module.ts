import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsikologHesabiPage } from './psikologhesabi.page';

const routes: Routes = [
  {
    path: '',
    component: PsikologHesabiPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PsikologHesabiRoutingModule {}
