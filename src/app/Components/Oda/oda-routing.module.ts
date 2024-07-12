import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OdaPage } from './oda.page';

const routes: Routes = [
  {
    path: '',
    component: OdaPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OdaRoutingModule {}
