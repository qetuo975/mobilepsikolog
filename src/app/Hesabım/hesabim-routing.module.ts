import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HesabimPage } from './hesabim.page';

const routes: Routes = [
  {
    path: '',
    component: HesabimPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HesabimRoutingModule {}
