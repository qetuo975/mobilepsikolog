import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './Guards/auth.guard';

const config: SocketIoConfig = { url: 'http://therapydays.com:5000', options: {}};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyDXJFKNYGbJfPdoy2-_72sAdENZz0d63RQ',
      authDomain: 'psikologmobile-a9ca7.firebaseapp.com',
      projectId: 'psikologmobile-a9ca7',
      storageBucket: 'psikologmobile-a9ca7.appspot.com',
      messagingSenderId: '313472590646',
      appId: '1:313472590646:web:af3d43e35f1e8ef36b4997',
      measurementId: 'G-PYT7EL840H',
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
