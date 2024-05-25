import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TerapistPage } from './terapist.page';

const routes: Routes = [
  {
    path: '',
    component: TerapistPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TerapistPageRoutingModule {}
