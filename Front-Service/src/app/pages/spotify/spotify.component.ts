import { Component, OnInit } from '@angular/core';
import { SpotifyService } from './spotify.service';

export interface Playlist {
  name: string,
  id:string,
  nbTracks: string,
}

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.css']
})
export class SpotifyComponent implements OnInit {

  loggedIn = false
  loading = true
  username = "";
  playlists = [];
  datasource : any;

  displayedColumns: string[] = ['index', 'name', 'nbtracks'];


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
              this.spotifyService.get_playlists().subscribe(
                r => {
                  for (let item of r["items"]) {
                    var pl : Playlist = {name: item["name"], id: item["id"], nbTracks: item["tracks"]["total"]}
                    this.playlists.push(pl);
                  }
                  this.datasource = this.playlists
              });
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