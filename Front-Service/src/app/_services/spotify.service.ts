import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface Playlist {
  name: string;
  id: string;
  nbTracks: string;
}

export interface Songs {
  name: string;
  desc: string;
  songs: Array<Song>;
}

export interface Song {
  name: string;
  album: string;
}

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private http: HttpClient) {}

  connected() {
    return this.http.get(`${environment.apiUrl}/spotify/connected`);
  }

  sendCode(code) {
    const payload = new HttpParams().set('code', code);
    return this.http.post(`${environment.apiUrl}/spotify/connect`, payload);
  }

  disconect() {
    return this.http.delete(`${environment.apiUrl}/spotify/disconnect`);
  }

  get_info() {
    return this.http.get(`${environment.apiUrl}/spotify/info`);
  }

  getPlaylists() {
    return this.http.get(`${environment.apiUrl}/spotify/playlists`);
  }

  getPlaylist(playlist_id: string) {
    return this.http.get(
      `${environment.apiUrl}/spotify/playlist/` + playlist_id
    );
  }

  resToPlaylists(r) {
    let playlists: Array<Playlist> = [];
    for (let item of r['items']) {
      var pl: Playlist = {
        name: item['name'],
        id: item['id'],
        nbTracks: item['tracks']['total'],
      };
      playlists.push(pl);
    }
    return playlists;
  }

  resToSongs(r): Songs {
    let songs: Songs = { name: '', desc: '', songs: new Array<Song>() };
    songs.name = r['name'];
    songs.desc = r['description'];
    for (let s in r.tracks.items) {
      songs.songs.push({
        name: r.tracks.items[s].track.name,
        album: r.tracks.items[s].track.album.name,
      });
    }
    return songs;
  }
}
