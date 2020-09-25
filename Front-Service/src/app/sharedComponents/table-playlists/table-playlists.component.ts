import { Component, OnInit, Input } from '@angular/core';
import { GatewayService } from '../../_services/gateway.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


export interface Playlist {
  name: string,
  id:string,
  nbTracks: string,
}

@Component({
  selector: 'app-table-playlists',
  templateUrl: './table-playlists.component.html',
  styleUrls: ['./table-playlists.component.css']
})
export class TablePlaylistsComponent implements OnInit {

  @Input() service: number;

  loading = true
  playlists = [];
  datasource : any;
  displayedColumns: string[] = ['index', 'name', 'nbtracks', 'id'];
  isMobile : Boolean;

  constructor(private gatewayService: GatewayService, private breakpointObserver: BreakpointObserver) {

   }

  ngOnInit(): void {
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 500px)');
    this.displayedColumns = (this.isMobile ? ['name', 'id'] : ['index', 'name', 'nbtracks', 'id']);
    this.breakpointObserver.observe(['(max-width: 500px)'])
    .subscribe(result => {
      if (result.matches) {
        this.isMobile = true;
        this.displayedColumns = ['name', 'id'];
      } else {
        this.isMobile = false;
        this.displayedColumns = ['index', 'name', 'nbtracks', 'id'];
      }
    });
    this.gatewayService.getPlaylists(this.service).subscribe(
      r => {
        for (let item of r["items"]) {
          var pl : Playlist = {name: item["name"], id: item["id"], nbTracks: item["tracks"]["total"]}
          this.playlists.push(pl);
        }
        this.datasource = this.playlists
        this.loading = false
    });
  }
}
