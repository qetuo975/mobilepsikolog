import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./Components/Login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./Components/Register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: 'bloglar',
    loadChildren: () =>
      import('./Components/Bloglar/bloglar.module').then(
        (m) => m.BloglarModule
      ),
  },
  {
    path: 'test/:id',
    loadChildren: () =>
      import('./Components/Test/test.module').then(
        (m) => m.TestModule
      ),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
