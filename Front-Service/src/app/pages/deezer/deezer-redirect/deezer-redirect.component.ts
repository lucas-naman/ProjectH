import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DeezerService } from '../../../_services/deezer.service';

@Component({
  selector: 'app-deezer-redirect',
  templateUrl: './deezer-redirect.component.html',
  styleUrls: ['./deezer-redirect.component.css']
})
export class DeezerRedirectComponent implements OnInit {

  loading = true;

  constructor(private route: ActivatedRoute,
    private deezer: DeezerService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.route.snapshot.queryParams['error_reason']) {
      this.loading = false;
    }
    else {
      this.deezer.sendCode(this.route.snapshot.queryParams['code'])
      .subscribe(
        res => {
          this.router.navigate(['/deezer']);
        },
        err => {
          this.loading = false;
        }
      );
      
    }
  }

}
