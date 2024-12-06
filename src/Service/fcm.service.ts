import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { PushNotifications, Token, ActionPerformed } from '@capacitor/push-notifications';
import { Observable } from 'rxjs';
import { api } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FCMService {
  private baseUrl: string = `${api}/general`;

  constructor(private router: Router, private http: HttpClient) {}

  // Başlatma fonksiyonu
  initPush() {
    if (Capacitor.getPlatform() !== 'web') {
      this.registerNotifications();
      this.addListeners();
    }
  }

  sendToken(token: any, userId: any, type: any): Observable<any> {
    const body = { token, userId, type };
    return this.http.post(`${this.baseUrl}/sendToken`, body).pipe();
  }


  // Dinleyiciler ekle
  private async addListeners() {
    await PushNotifications.addListener('registration', (token: Token) => {
      console.info('Registration token:', token.value);
      localStorage.setItem('fcmtoken', token.value);
    });

    await PushNotifications.addListener('registrationError', (error: any) => {
      console.error('Registration error:', error);
    });

    await PushNotifications.addListener('pushNotificationReceived', (notification) => {
      console.log('Push notification received:', notification);
      // Bildirim içeriğini burada işleyebilirsin
    });

    await PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
      console.log('Push notification action performed:', notification);
      if (notification.notification.data.page) {
        this.router.navigate([notification.notification.data.page]);
      }
    });
  }

  // Bildirimleri kaydet ve izinleri kontrol et
  private async registerNotifications() {
    let permStatus = await PushNotifications.checkPermissions();

    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }

    await PushNotifications.register();
  }

  // Teslim edilen bildirimleri getir
  async getDeliveredNotifications() {
    const notificationList = await PushNotifications.getDeliveredNotifications();
    console.log('Delivered notifications:', notificationList);
  }
}
