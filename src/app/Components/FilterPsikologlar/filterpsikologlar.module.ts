import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPsikologlarPage } from './filterpsikologlar.page';
import { FilterPsikologlarRoutingModule } from './filterpsikologlar-routing.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    FilterPsikologlarRoutingModule,
  ],
  declarations: [FilterPsikologlarPage],
})
export class FilterPsikologlarModule {}
