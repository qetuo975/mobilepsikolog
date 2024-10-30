import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/Service/user.service';

@Component({
  selector: 'app-verifty',
  templateUrl: 'veritfy.page.html',
  styleUrls: ['veritfy.page.scss'],
})
export class VeritfyPage implements OnInit {
  verificationCode: string = '';
  email!: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Query params'i dinle
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
    });

    console.log(this.email);
  }

  onVerify() {
    this.userService.verify(this.email, this.verificationCode).subscribe({
      next: (response: any) => {
        console.log('Verification successful:', response);
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        console.error('Verification failed:', error);
        alert('Doğrulama başarısız. Lütfen tekrar deneyin.');
      },
    });
  }
}
