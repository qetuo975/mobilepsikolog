import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './Guards/auth.guard';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyA9Yl6lssE1UkdCiH1WALuElKYEYOpwQ7c',
      authDomain: 'psikologmobile.firebaseapp.com',
      projectId: 'psikologmobile',
      storageBucket: 'psikologmobile.appspot.com',
      messagingSenderId: '832039197109',
      appId: '1:832039197109:web:66eda5e478d71905c6a1fc',
      measurementId: 'G-0HRCTRM1B3',
    }),
    AngularFireAuthModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
