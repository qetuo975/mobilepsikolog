import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BloglarPage} from './bloglar.page';
import { BloglarRoutingModule } from './bloglar-routing.module';
import { BlogDetailsComponent } from './blog-details/blog-details.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    BloglarRoutingModule
  ],
  declarations: [BloglarPage, BlogDetailsComponent]
})
export class BloglarModule {}
