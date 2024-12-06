import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),

  },
  {
    path: 'viewer',
    loadChildren: () =>
      import('./Components/Viewer/viewer.module').then(
        (m) => m.ViewerModule
      ),

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
    path: 'filterpsikologlar',
    loadChildren: () =>
      import('./Components/FilterPsikologlar/filterpsikologlar.module').then(
        (m) => m.FilterPsikologlarModule
      ),

  },
  {
    path: 'chat',
    loadChildren: () =>
      import('./Components/Chat/chat.module').then((m) => m.ChatModule),

  },
  {
    path: 'verification-code',
    loadChildren: () =>
      import('./Components/Veritify/veritfy.module').then((m) => m.VeritfyModule),
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
      import('./Components/Test/test.module').then((m) => m.TestModule),

  },
  {
    path: 'psikolog/:id',
    loadChildren: () =>
      import('./Components/PsikologHesabi/psikologhesabi.module').then(
        (m) => m.PsikologHesabiModule
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
