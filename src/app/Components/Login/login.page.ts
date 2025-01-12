import { UserService } from './../../../Service/user.service';
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BlogsService } from 'src/Service/blogs.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit {
  arkaplan: any;
  loginForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  serverpath: any = 'https://api.therapydays.com/static';

  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private router: Router,
    private UserService: UserService,
    private BlogsService: BlogsService
  ) {}

  ngOnInit(): void {
    localStorage.removeItem('id');
    localStorage.removeItem('type');

    this.BlogsService.getArkaplan().subscribe({
      next: (res: any) => {
        this.arkaplan = res.Data;
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  async presentToast(
    message: string,
    color: string,
    position: 'top' | 'middle' | 'bottom'
  ) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      color: color,
      position: position,
    });

    await toast.present();
  }

  onSubmit() {
    if (this.loginForm && this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.UserService.login(email, password).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          if (response.message == 'Error') {
            this.presentToast(
              'Giriş başarısız. Hesap bilgilerinizi doğru girin.',
              'danger',
              'top'
            );
          } else {
            localStorage.setItem('id', response.token.user.id);
            localStorage.setItem('type', response.token.type);
            this.presentToast('Giriş başarılı!', 'success', 'top');
            this.router.navigate(['/tabs']);
          }
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.presentToast(
            'Giriş başarısız. Lütfen tekrar deneyin.',
            'danger',
            'top'
          );
        },
      });
    } else {
      this.presentToast(
        'Lütfen Gerekli Alanları Doldurunuz.',
        'secondary',
        'top'
      );
    }
  }

}
