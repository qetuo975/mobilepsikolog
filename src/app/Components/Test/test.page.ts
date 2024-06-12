import { TestService } from './../../../Service/test.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: 'test.page.html',
  styleUrls: ['test.page.scss'],
})
export class TestPage implements OnInit {
  constructor(
    private TestService: TestService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.TestService.getTest(parseInt(id, 10)).subscribe({
        next: (result: any) => {
          console.log(result);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }
}
