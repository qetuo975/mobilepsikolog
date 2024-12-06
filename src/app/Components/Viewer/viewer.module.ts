import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewerPage } from './viewer.page';

import { ViewerPageRoutingModule } from './viewer-routing.module';
import { SharedModule } from 'src/app/Shared/shared.module';


@NgModule({
  imports: [IonicModule, ReactiveFormsModule, CommonModule, FormsModule, ViewerPageRoutingModule, SharedModule],
  declarations: [ViewerPage],
})
export class ViewerModule {}
