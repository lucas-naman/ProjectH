import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../_services/spotify.service';

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.css']
})
export class SpotifyComponent implements OnInit {

  loggedIn = false
  loading = true
  username = "";

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.spotifyService.connected()
    .subscribe(
      (res) => {
        if (res["status"] === "true") {
          this.loggedIn = true;
          this.spotifyService.get_info().subscribe(
            r => {
              this.username = r["display_name"];
              this.loading = false;
            });
        } else {
          this.loading = false;
        }
      });
  }

  disconect() {
    this.loading = true;
    this.spotifyService.disconect()
    .subscribe(
      res => { 
        location.reload(true);
      });
  }

}