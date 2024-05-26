import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BloglarPage } from './bloglar.page';
import { BlogDetailsComponent } from './blog-details/blog-details.component';

const routes: Routes = [
  {
    path: '',
    component: BloglarPage,
  },
  {
    path: ':id',
    component: BlogDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BloglarRoutingModule {}
