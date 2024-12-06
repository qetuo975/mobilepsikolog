import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogsService } from 'src/Service/blogs.service';

@Component({
  selector: 'app-viewer',
  templateUrl: 'viewer.page.html',
  styleUrls: ['viewer.page.scss'],
  animations: [
    trigger('fadeInOut', [
      state(
        'visible',
        style({
          opacity: 1,
          transform: 'translateY(0)',
        })
      ),
      state(
        'hidden',
        style({
          opacity: 0,
          transform: 'translateY(10px)',
        })
      ),
      transition('hidden => visible', [animate('500ms ease-in')]),
      transition('visible => hidden', [animate('500ms ease-out')]),
    ]),
  ],
})
export class ViewerPage implements OnInit {
  doctors: any = [];
  messages: any = [];
  serverpath: any = 'https://api.therapydays.com/static';
  currentMessage!: any;
  currentIndex = 0;
  state = 'visible'; // Başlangıç durumu

  constructor(private previewService: BlogsService, private router: Router) {}


  ngOnInit(): void {
    this.previewService.getPreviewDoctor().subscribe({
      next: (value : any) => {
        if (!value) return;
        this.doctors = value.Data;
        console.log(value);
      },
      error: (err: any) => {
        console.log(err);
      }
    });

    this.previewService.getPreview().subscribe({
      next: (value: any) => {
        if (!value) return;
        this.messages = value.Data;
        this.currentMessage = this.messages[0];
        console.log(value);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  // Mesaj değiştirme işlevi
  changeMessage() {
    this.state = 'hidden'; // Önce kaybolma animasyonunu başlat
    setTimeout(() => {
      this.currentIndex++;

      if (this.currentIndex < this.messages.length) {
        this.currentMessage = this.messages[this.currentIndex];
        this.state = 'visible'; // Yeni mesaj görünür hale gelsin
      } else {
        // Mesajlar bittiğinde login sayfasına yönlendir
        this.router.navigate(['/login']);
      }
    }, 500); // Animasyon süresiyle senkronize
  }
}
