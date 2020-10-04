import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SpotifyService } from './spotify.service';
import { YoutubeService } from './youtube.service';
import { DeezerService } from './deezer.service';

@Injectable({
  providedIn: 'root'
})
export class GatewayService {

  private listServices: Array<any>;

  constructor(private http: HttpClient, private spotify: SpotifyService, private youtube: YoutubeService, private deezer: DeezerService) {
    this.listServices = [this.spotify, this.youtube, this.deezer]
  }

  getPlaylists(service) {
    return this.listServices[service].getPlaylists()
  }

  getPlaylist(service: number, playlist_id: string) {
    return this.listServices[service].getPlaylist(playlist_id)
  }

  resToPlaylists(service, res) {
    return this.listServices[service].resToPlaylists(res)
  }

  resToSongs(service, res) {
    return this.listServices[service].resToSongs(res)
  }

  export(service, playlist_id) {
    return this.http.post(`${environment.apiUrl}/export/playlist`, {service: service, playlist_id: playlist_id})
  }

}
