import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnasayfaPage } from './anasayfa.page';

import { AnasayfaPageRoutingModule } from './anasayfa-routing.module';
import { TruncatePipe } from 'src/app/Pipe/truncate.pipe';

@NgModule({
  imports: [IonicModule, ReactiveFormsModule, CommonModule, FormsModule, AnasayfaPageRoutingModule],
  declarations: [AnasayfaPage, TruncatePipe],
})
export class AnasayfaModule {}
