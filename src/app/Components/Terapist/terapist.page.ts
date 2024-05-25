import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ara',
  templateUrl: 'terapist.page.html',
  styleUrls: ['terapist.page.scss'],
})
export class TerapistPage implements OnInit {
  step: number = 0;

  nextStep() {
    this.step++;
  }

  nextRouter()
  {

  }
  constructor() {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
