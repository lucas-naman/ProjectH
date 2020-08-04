import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { 

  }

  connected() {
    return this.http.get(`${environment.apiUrl}/spotify/connected`)
  }

  sendCode(code) {
    const payload = new HttpParams()
    .set('code', code)
    return this.http.post(`${environment.apiUrl}/spotify/connect`, payload)
  }

  disconect() {
    return this.http.delete(`${environment.apiUrl}/spotify/disconnect`)
  }

  get_info() {
    return this.http.get(`${environment.apiUrl}/spotify/info`)
  }

  get_playlists() {
    return this.http.get(`${environment.apiUrl}/spotify/playlists`)
  }

}
