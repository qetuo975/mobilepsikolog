/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { GoogleAuthServiceService } from 'src/Service/google-auth-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required], // Kullanıcı adı alanı
    password: ['', Validators.required], // Şifre alanı
  });

  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private GoogleAuthService: GoogleAuthServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Lütfen Gerekli Alanları Doldurunuz.',
      duration: 1500,
      color: 'secondary',
      icon: 'globe',
      positionAnchor: 'header',
      position: position,
    });

    await toast.present();
  }

  onSubmit() {
    if (this.loginForm && this.loginForm.valid) {
      console.log('Form submitted:', this.loginForm.value);
    } else {
      this.presentToast('top');
    }
  }

  loginWithGoogle() {
    this.GoogleAuthService.loginWithGoogle()
      .then((data) => {
        console.log(data);
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
