import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PsikologHesabiPage } from './psikologhesabi.page';
import { PsikologHesabiRoutingModule } from './psikologhesabi-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PsikologHesabiRoutingModule,
  ],
  declarations: [PsikologHesabiPage],
})
export class PsikologHesabiModule {}
