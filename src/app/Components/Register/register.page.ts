/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BlogsService } from 'src/Service/blogs.service';
import { GoogleAuthServiceService } from 'src/Service/google-auth-service.service';
import { UserService } from 'src/Service/user.service'; // UserService'i ekleyin

@Component({
  selector: 'app-tab1',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class RegisterPage implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]], // Email alanı
    password: ['', Validators.required], // Şifre alanı
    isPsikolog: [false, Validators.required]
  });
  serverpath: any = 'https://api.therapydays.com/static';
  arkaplan: any;

  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private GoogleAuthService: GoogleAuthServiceService,
    private router: Router,
    private userService: UserService, // UserService'i enjekte edin
    private BlogsService: BlogsService
  ) {}

  ngOnInit(): void {
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
      this.userService
        .register(email, password, this.loginForm.value.isPsikolog ? this.loginForm.value.isPsikolog : false)
        .subscribe({
          next: (response) => {
            console.log('Registration successful:', response);
            this.presentToast('Kayıt başarılı!', 'success', 'top');
            this.router.navigate(['/login']);
          },
          error: (error) => {
            console.error('Registration failed:', error);
            this.presentToast(
              'Kayıt başarısız. Lütfen tekrar deneyin.',
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

  loginWithGoogle() {
    this.GoogleAuthService.loginWithGoogle()
      .then((data) => {
        const email: any = data.user?.email;
        const password: any = data.user?.uid;
        const verifiy: any = data.user?.emailVerified;

        if (verifiy) {
          this.userService
            .register(
              email,
              password,
              this.loginForm.value.isPsikolog
                ? this.loginForm.value.isPsikolog
                : false
            )
            .subscribe({
              next: (response) => {
                console.log('Registration successful:', response);
                this.presentToast('Kayıt başarılı!', 'success', 'top');
                this.router.navigate(['/login']);
              },
              error: (error) => {
                console.error('Registration failed:', error);
                this.presentToast(
                  'Kayıt başarısız. Lütfen tekrar deneyin.',
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
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
