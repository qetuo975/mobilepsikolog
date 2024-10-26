import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnasayfaPage } from './anasayfa.page';

import { AnasayfaPageRoutingModule } from './anasayfa-routing.module';
import { SharedModule } from 'src/app/Shared/shared.module';


@NgModule({
  imports: [IonicModule, ReactiveFormsModule, CommonModule, FormsModule, AnasayfaPageRoutingModule, SharedModule],
  declarations: [AnasayfaPage],
})
export class AnasayfaModule {}
