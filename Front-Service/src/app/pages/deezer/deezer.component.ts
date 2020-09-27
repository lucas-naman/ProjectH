import { Component, OnInit } from '@angular/core';
import { DeezerService } from '../../_services/deezer.service';

@Component({
  selector: 'app-deezer',
  templateUrl: './deezer.component.html',
  styleUrls: ['./deezer.component.css']
})
export class DeezerComponent implements OnInit {

  loggedIn = false;
  loading = true;
  username = "";

  constructor(private deezerService: DeezerService) { }

  ngOnInit(): void {
    this.deezerService.connected()
    .subscribe(
      (res) => {
        if (res["status"] === "true") {
          this.loggedIn = true;
          // this.deezerService.get_info().subscribe(
          //   r => {
          //     this.username = r["display_name"];
          //     this.loading = false;
          //  });
        } else {
          this.loading = false;
        }
      });
  }

  disconect() {
    this.loading = true;
    this.deezerService.disconect()
    .subscribe(
      res => { 
        location.reload(true);
      });
  }

}
