import { PsikologService } from './../../../Service/psikolog.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-psikologlar',
  templateUrl: 'psikologlar.page.html',
  styleUrls: ['psikologlar.page.scss'],
})
export class PsikologlarPage implements OnInit {
  psikologlar: any[] = [];
  serverpath: string = environment.serverphotopath;

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
