import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../Guards/auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'anasayfa',
        loadChildren: () =>
          import('../Components/Anasayfa/anasayfa.module').then(
            (m) => m.AnasayfaModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'hesabim',
        loadChildren: () =>
          import('../Components/Hesabım/hesabim.module').then(
            (m) => m.HesabimModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'psikologlar',
        loadChildren: () =>
          import('../Components/Psikologlar/psikologlar.module').then(
            (m) => m.PsikologlarModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'seanslar',
        loadChildren: () =>
          import('../Components/Seanslar/seanslar.module').then(
            (m) => m.SeanslarModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: '',
        redirectTo: '/tabs/anasayfa',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/anasayfa',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
