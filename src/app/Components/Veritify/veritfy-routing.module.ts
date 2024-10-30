import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VeritfyPage } from './veritfy.page';

const routes: Routes = [
  {
    path: '',
    component: VeritfyPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VeritfyRoutingModule {}
