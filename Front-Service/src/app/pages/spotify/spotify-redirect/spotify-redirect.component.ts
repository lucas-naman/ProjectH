import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SpotifyService } from '../../../_services/spotify.service';

@Component({
  selector: 'app-spotify-redirect',
  templateUrl: './spotify-redirect.component.html',
  styleUrls: ['./spotify-redirect.component.css']
})
export class SpotifyRedirectComponent implements OnInit {

  loading = true;

  constructor(private route: ActivatedRoute,
    private spotifyService: SpotifyService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.route.snapshot.queryParams['error'] || this.route.snapshot.queryParams['code'] == undefined || this.route.snapshot.queryParams['state'] == undefined) {
      this.loading = false;
    }
    else {
      this.spotifyService.sendCode(this.route.snapshot.queryParams['code'])
      .subscribe(
        res => {
          this.router.navigate(['/spotify']);
        },
        err => {
          this.loading = false;
        }
      );
      
    }
  }

}
