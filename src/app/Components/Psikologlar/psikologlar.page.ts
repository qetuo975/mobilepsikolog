import { PsikologService } from './../../../Service/psikolog.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-psikologlar',
  templateUrl: 'psikologlar.page.html',
  styleUrls: ['psikologlar.page.scss'],
})
export class PsikologlarPage implements OnInit {
  psikologlar: any[] = [];


  constructor(
    private PsikologService: PsikologService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      this.psikologlar = state['filterData'];

      console.log(this.psikologlar);
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
