import { NavigationExtras, Router } from '@angular/router';
import { PsikologService } from './../../../Service/psikolog.service';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { UserService } from 'src/Service/user.service';

@Component({
  selector: 'app-psikologlar',
  templateUrl: 'psikologlar.page.html',
  styleUrls: ['psikologlar.page.scss'],
})
export class PsikologlarPage implements OnInit {
  psikologlar: any[] = [];
  serverpath: any = 'https://api.therapydays.com/static';
  puanfilter: boolean = false;
  id: any;
  type: any;
  oda: any;

  constructor(private PsikologService: PsikologService, private router: Router,private toastController: ToastController, private UserService: UserService) {
    const state: any = this.router.getCurrentNavigation()?.extras.state;

    if (state && state.puan)
    {
      this.puanfilter = true;
    }
  }

  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    this.type = localStorage.getItem('type');
    // İlk açılışta verileri yükle
    this.loadPsikologs();

    if (this.type == 'user') {
      this.UserService.getUserOda(Number(localStorage.getItem('id'))).subscribe(
        {
          next: (result: any) => {
            console.log(result);
            if (Array(result).length) {
              this.oda = result;
              console.log(this.oda);
            }
          },
          error: (err: any) => {
            console.log(err);
          },
        }
      );
    }
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
      color: color
    });

    await toast.present();
  }

  insertPuan(id: number)
  {
    this.UserService.insertPuan(this.type, this.id, id).subscribe({
      next: (res: any) => {
        this.presentToast("top", "Beğeni Paylaşıldı", 'success');
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
        this.presentToast("top", "Beğeni Paylaşılamadı", 'danger');
      }
    })
  }


  ionViewWillEnter(): void {
    // Sayfa her ziyaret edildiğinde verileri yeniden yükle
    this.loadPsikologs();
  }

  navigatePsikolog(id: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        free: true,
        id: this.oda[0].id
      },
    };
    this.router.navigate([`/psikolog/${id}`], navigationExtras);
  }

  loadPsikologs(): void {
    if (this.puanfilter)
    {
      this.PsikologService.getPsikologsPuan().subscribe({
        next: (result: any) => {
          this.psikologlar = result;
          console.log(result);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    } else {
      this.PsikologService.getPsikologs().subscribe({
        next: (result: any) => {
          this.psikologlar = result;
          console.log(result);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }
}
