import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './Guards/auth.guard';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyC1JGCpWajLZnAGzQThe8HA5yDDpbqso2s",
      authDomain: "therapydays-b6a85.firebaseapp.com",
      projectId: "therapydays-b6a85",
      storageBucket: "therapydays-b6a85.appspot.com",
      messagingSenderId: "724516351611",
      appId: "1:724516351611:web:5a09343fbdcf9afd3c7cde"
    }),
    AngularFireAuthModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
