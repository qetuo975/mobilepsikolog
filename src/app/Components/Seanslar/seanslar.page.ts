import { Component } from '@angular/core';

@Component({
  selector: 'app-seanslar',
  templateUrl: 'seanslar.page.html',
  styleUrls: ['seanslar.page.scss'],
})
export class SeanslarPage {
  constructor() {}
  selectedSegment: string = 'default';
}
