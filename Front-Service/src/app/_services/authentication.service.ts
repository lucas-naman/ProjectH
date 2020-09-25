import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentTokenSubject: BehaviorSubject<String>;
    public currentToken: Observable<String>;

    constructor(private http: HttpClient,
        private cookieService: CookieService,
        private router: Router) {
        var token = this.cookieService.get('token');
        if (token) {
            localStorage.setItem('token', token);
        }
        this.currentTokenSubject = new BehaviorSubject<String>(JSON.parse(localStorage.getItem('token')));
        this.currentToken = this.currentTokenSubject.asObservable();
    }

    public get currentTokenValue(): String {
        return this.currentTokenSubject.value;
    }

    login(_email: string, _password: string) {
        const payload = new HttpParams()
            .set('email', _email)
            .set('password', _password);
        return this.http.post<any>(`${environment.apiUrl}/auth/login`, payload)
            .pipe(map(res => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('token', JSON.stringify(res["token"]));
                this.cookieService.set('token', JSON.stringify(res["token"]));
                this.currentTokenSubject.next(res["token"]);
                return res;
            }));
    }

    register(_email: string, _password: string, _username: string) {
        const payload = new HttpParams()
            .set('email', _email)
            .set('password', _password)
            .set('username', _username);
        return this.http.post<any>(`${environment.apiUrl}/auth/register`, payload)
            .pipe(map(res => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('token', JSON.stringify(res["token"]));
                this.currentTokenSubject.next(res["token"]);
                return res;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        this.cookieService.deleteAll();
        localStorage.removeItem('token');
        this.currentTokenSubject.next(null);
        this.router.navigate(['/login']);
    }
}