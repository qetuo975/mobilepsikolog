import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guards/auth.guard';
import { FirstLoadGuard } from './Guards/firsload.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
    canActivate: [FirstLoadGuard],
  },
  {
    path: 'viewer',
    loadChildren: () =>
      import('./Components/Viewer/viewer.module').then(
        (m) => m.ViewerModule
      ),
  },
  {
    path: 'pay',
    loadChildren: () =>
      import('./Components/Pay/pay.module').then(
        (m) => m.PayModule
      ),
      canActivate: [AuthGuard]
  },
  {
    path: 'status',
    loadChildren: () =>
      import('./Components/OdemeStatus/status.module').then(
        (m) => m.StatusModule
      ),
      canActivate: [AuthGuard]
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
      canActivate: [AuthGuard]
  },
  {
    path: 'chat',
    loadChildren: () =>
      import('./Components/Chat/chat.module').then((m) => m.ChatModule),
    canActivate: [AuthGuard]
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
      canActivate: [AuthGuard]
  },
  {
    path: 'test/:id',
    loadChildren: () =>
      import('./Components/Test/test.module').then((m) => m.TestModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'psikolog/:id',
    loadChildren: () =>
      import('./Components/PsikologHesabi/psikologhesabi.module').then(
        (m) => m.PsikologHesabiModule
      ),
      canActivate: [AuthGuard]
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
