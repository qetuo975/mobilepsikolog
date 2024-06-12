import { SeansService } from './../../../Service/seans.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seanslar',
  templateUrl: 'seanslar.page.html',
  styleUrls: ['seanslar.page.scss'],
})
export class SeanslarPage implements OnInit {
  constructor(private SeansService: SeansService) {}

  ngOnInit(): void {
    const getId: any = localStorage.getItem('id');
    const type: any = localStorage.getItem('type');

    if (type == 'user') {
      this.SeansService.getSeansUser(getId).subscribe({
        next: (result: any) => {
          console.log(result);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    } else {
      this.SeansService.getSeansPsikolog(getId).subscribe({
        next: (result: any) => {
          console.log(result);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }
  selectedSegment: string = 'default';
}
