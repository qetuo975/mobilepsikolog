import { Router } from '@angular/router';
import { PsikologService } from './../../../Service/psikolog.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-psikologlar',
  templateUrl: 'psikologlar.page.html',
  styleUrls: ['psikologlar.page.scss'],
})
export class PsikologlarPage implements OnInit {
  psikologlar: any[] = [];
  serverpath: any = 'https://api.therapydays.com/static';
  puanfilter: boolean = false;

  constructor(private PsikologService: PsikologService, private router: Router) {
    const state: any = this.router.getCurrentNavigation()?.extras.state;

    if (state && state.puan)
    {
      this.puanfilter = true;
    }
  }

  ngOnInit(): void {
    // İlk açılışta verileri yükle
    this.loadPsikologs();
  }


  ionViewWillEnter(): void {
    // Sayfa her ziyaret edildiğinde verileri yeniden yükle
    this.loadPsikologs();
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
