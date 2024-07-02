import { PsikologService } from './../../../Service/psikolog.service';
import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-psikologlar',
  templateUrl: 'psikologlar.page.html',
  styleUrls: ['psikologlar.page.scss'],
})
export class PsikologlarPage implements OnInit {
  psikologlar: any[] = [];
  serverpath: any = 'https://therapydays.com/static';

  constructor(private PsikologService: PsikologService) {}

  ngOnInit(): void {
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
