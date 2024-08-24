import { PsikologService } from '../../../Service/psikolog.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-psikologlar',
  templateUrl: 'filterpsikologlar.page.html',
  styleUrls: ['filterpsikologlar.page.scss'],
})
export class FilterPsikologlarPage implements OnInit {
  psikologlar: any[] = [];
  isLoading: boolean = true;
  serverpath: any = 'https://bahrikement.com/static';
  constructor(private router: Router) {}

  ngOnInit(): void {
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
