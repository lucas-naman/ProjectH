import { Injectable } from '@angular/core';
import { SpotifyService } from './spotify.service';
import { YoutubeService } from './youtube.service';
import { DeezerService } from './deezer.service';

@Injectable({
  providedIn: 'root'
})
export class GatewayService {

  private listServices: Array<any>;

  constructor(private spotify: SpotifyService, private youtube: YoutubeService, private deezer: DeezerService) {
    this.listServices = [this.spotify, this.youtube, this.deezer]
  }

  getPlaylists(service) {
    return this.listServices[service].getPlaylists()
  }

  getPlaylist(service: number, playlist_id: string) {
    return this.listServices[service].getPlaylist(playlist_id)
  }

}
