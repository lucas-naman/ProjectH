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
export class DeezerService {
  constructor(private http: HttpClient) {}

  connected() {
    return this.http.get(`${environment.apiUrl}/deezer/connected`);
  }

  sendCode(code) {
    const payload = new HttpParams().set('code', code);
    return this.http.post(`${environment.apiUrl}/deezer/connect`, payload);
  }

  disconect() {
    return this.http.delete(`${environment.apiUrl}/deezer/disconnect`);
  }

  get_info() {
    return this.http.get(`${environment.apiUrl}/deezer/info`);
  }

  getPlaylists() {
    return this.http.get(`${environment.apiUrl}/deezer/playlists`);
  }

  getPlaylist(playlist_id: string) {
    return this.http.get(
      `${environment.apiUrl}/deezer/playlist/` + playlist_id.toString()
    );
  }

  resToPlaylists(r: any): Array<Playlist> {
    let playlists: Array<Playlist> = [];
    for (let p in r['data']) {
      var pl: Playlist = {
        name: r['data'][p]['title'],
        id: r['data'][p]['id'],
        nbTracks: r['data'][p]['nb_tracks'],
      };
      playlists.push(pl);
    }
    return playlists;
  }

  resToSongs(r): Songs {
    let songs: Songs = { name: '', desc: '', songs: new Array<Song>() };
    console.log(r);
    songs.name = r['title'];
    songs.desc = r['description'];
    for (let s in r.tracks.data) {
      songs.songs.push({
        name: r.tracks.data[s].title,
        album: r.tracks.data[s].album.title,
      });
    }
    return songs;
  }
}
