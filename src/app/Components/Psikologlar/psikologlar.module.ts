import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PsikologlarPage } from './psikologlar.page';

import { PsikologlarPageRoutingModule } from './psikologlar-routing.module';
import { BlogsComponent } from 'src/app/Helpers/blogs/blogs.component';
import { PopularPsikologlarComponent } from 'src/app/Helpers/popular-psikologlar/popular-psikologlar.component';
import { KategorilerComponent } from 'src/app/Helpers/kategoriler/kategoriler.component';
import { FilterpsikologComponent } from 'src/app/Helpers/filterpsikolog/filterpsikolog.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PsikologlarPageRoutingModule,
  ],
  declarations: [PsikologlarPage, BlogsComponent, PopularPsikologlarComponent, KategorilerComponent, FilterpsikologComponent],
})
export class PsikologlarModule {}
