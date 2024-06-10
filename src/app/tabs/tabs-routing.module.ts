import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'ara',
        loadChildren: () =>
          import('../Components/Terapist/terapist.module').then(
            (m) => m.TerapistPageModule
          ),
      },
      {
        path: 'psikologlar',
        loadChildren: () =>
          import('../Components/Psikologlar/psikologlar.module').then(
            (m) => m.PsikologlarModule
          ),
      },
      {
        path: 'hesabim',
        loadChildren: () =>
          import('../Components/Hesabım/hesabim.module').then(
            (m) => m.HesabimModule
          ),
      },
      {
        path: 'seanslar',
        loadChildren: () =>
          import('../Components/Seanslar/seanslar.module').then(
            (m) => m.SeanslarModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/psikologlar',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/psikologlar',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
