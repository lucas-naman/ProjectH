import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { GatewayService } from '../../_services/gateway.service';

export interface DialogData {
  service: number;
  playlist_id: string;
}

@Component({
  selector: 'app-sync-modal',
  templateUrl: './sync-modal.component.html',
  styleUrls: ['./sync-modal.component.css']
})
export class SyncModalComponent {

  playlist = null;
  loading = true;

  constructor(public dialogRef: MatDialogRef<SyncModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private gateway: GatewayService) {

    }

  ngOnInit(): void {
    this.gateway.getPlaylist(this.data.service, this.data.playlist_id).subscribe(playlist => {
      this.playlist = playlist;
      this.loading = false;
    });
    
  }

}
