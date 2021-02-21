import { Component, OnInit, Input } from '@angular/core';
import { GatewayService } from '../../_services/gateway.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { SyncModalComponent } from '../sync-modal/sync-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Playlist {
  name: string;
  id: string;
  nbTracks: string;
}

@Component({
  selector: 'app-table-playlists',
  templateUrl: './table-playlists.component.html',
  styleUrls: ['./table-playlists.component.css'],
})
export class TablePlaylistsComponent implements OnInit {
  @Input() service: number;

  loading = true;
  datasource: any;
  displayedColumns: string[] = ['index', 'name', 'nbtracks', 'id'];
  isMobile: Boolean;

  constructor(
    private gatewayService: GatewayService,
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 500px)');
    this.displayedColumns = this.isMobile
      ? ['name', 'id']
      : ['index', 'name', 'nbtracks', 'id'];
    this.breakpointObserver
      .observe(['(max-width: 500px)'])
      .subscribe((result) => {
        if (result.matches) {
          this.isMobile = true;
          this.displayedColumns = ['name', 'id'];
        } else {
          this.isMobile = false;
          this.displayedColumns = ['index', 'name', 'nbtracks', 'id'];
        }
      });
    this.gatewayService.getPlaylists(this.service).subscribe((r) => {
      this.datasource = this.gatewayService.resToPlaylists(this.service, r);
      this.loading = false;
    });
  }

  openDialog(playlist_id) {
    const dialogRef = this.dialog.open(SyncModalComponent, {
      data: {
        service: this.service,
        playlist_id: playlist_id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== false && result !== undefined) {
        this.gatewayService.export(this.service, result).subscribe((res) => {
          this._snackBar.open('playlist shared', 'Ok', {
            duration: 2000,
          });
        });
      }
    });
  }
}
