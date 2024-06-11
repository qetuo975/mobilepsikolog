import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnasayfaPage } from './anasayfa.page';

import { AnasayfaPageRoutingModule } from './anasayfa-routing.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, AnasayfaPageRoutingModule],
  declarations: [AnasayfaPage],
})
export class AnasayfaModule {}
