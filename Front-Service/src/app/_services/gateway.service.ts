import { Injectable } from '@angular/core';
import { SpotifyService } from './spotify.service';
import { YoutubeService } from './youtube.service'

@Injectable({
  providedIn: 'root'
})
export class GatewayService {

  private listServices: Array<any>;

  constructor(private spotify: SpotifyService, private youtube: YoutubeService) {
    this.listServices = [this.spotify, this.youtube]
  }

  getPlaylists(service) {
    return this.listServices[service].getPlaylists()
  }

}
