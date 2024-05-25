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
        loadChildren: () => import('../Terapist/terapist.module').then(m => m.TerapistPageModule)
      },
      {
        path: 'psikologlar',
        loadChildren: () => import('../Psikologlar/psikologlar.module').then(m => m.PsikologlarModule)
      },
      {
        path: 'hesabim',
        loadChildren: () => import('../Hesabım/hesabim.module').then(m => m.HesabimModule)
      },
      {
        path: '',
        redirectTo: '/tabs/ara',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/ara',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
