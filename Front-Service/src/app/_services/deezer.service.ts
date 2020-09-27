import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeezerService {

  constructor(private http: HttpClient) { }

  connected() {
    return this.http.get(`${environment.apiUrl}/deezer/connected`)
  }

  sendCode(code) {
    const payload = new HttpParams()
    .set('code', code)
    return this.http.post(`${environment.apiUrl}/deezer/connect`, payload)
  }

  disconect() {
    return this.http.delete(`${environment.apiUrl}/deezer/disconnect`)
  }

  get_info() {
    return this.http.get(`${environment.apiUrl}/deezer/info`)
  }

  getPlaylists() {
    return this.http.get(`${environment.apiUrl}/deezer/playlists`)
  }

  getPlaylist(playlist_id: string) {
    let headers = new HttpHeaders();
    headers = headers.set('playlist_id', playlist_id);
    return this.http.get(`${environment.apiUrl}/deezer/playlist`, {headers: headers})
  }
}
