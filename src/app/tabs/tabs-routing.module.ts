import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

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
      },
      {
        path: 'hesabim',
        loadChildren: () =>
          import('../Components/Hesabım/hesabim.module').then(
            (m) => m.HesabimModule
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
        path: 'seanslar',
        loadChildren: () =>
          import('../Components/Seanslar/seanslar.module').then(
            (m) => m.SeanslarModule
          ),
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
