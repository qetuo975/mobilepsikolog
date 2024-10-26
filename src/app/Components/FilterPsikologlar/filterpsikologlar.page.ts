import { PsikologService } from '../../../Service/psikolog.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from 'src/Service/user.service';

@Component({
  selector: 'app-psikologlar',
  templateUrl: 'filterpsikologlar.page.html',
  styleUrls: ['filterpsikologlar.page.scss'],
})
export class FilterPsikologlarPage implements OnInit {
  psikologlar: any[] = [];
  isLoading: boolean = true;
  serverpath: any = 'https://api.therapydays.com/static';
  id: any;
  type: any;
  constructor(private router: Router,private toastController: ToastController, private UserService: UserService) {}


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

  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    this.type = localStorage.getItem('type');

    const state = this.router.getCurrentNavigation()?.extras.state;

    setTimeout(() => {
      this.isLoading = false;

      if (state) {
        this.psikologlar = state['filterData'];

        console.log(this.psikologlar);
      }
    }, 1500);
  }

}
