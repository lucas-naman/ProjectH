import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './modules/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginFormComponent } from './pages/login/login-form/login-form.component';
import { RegisterFormComponent } from './pages/login/register-form/register-form.component';

import { PwdCheckValidatorDirective } from './directives/check-pwd.directive';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NavbarsComponent } from './_nav/navbars/navbars.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SpotifyComponent } from './pages/spotify/spotify.component';
import { SpotifyRedirectComponent } from './pages/spotify/spotify-redirect/spotify-redirect.component';
import { TablePlaylistsComponent } from './sharedComponents/table-playlists/table-playlists.component';
import { TableSongsComponent } from './sharedComponents/table-songs/table-songs.component';
import { SyncModalComponent } from './sharedComponents/sync-modal/sync-modal.component';
import { DeezerComponent } from './pages/deezer/deezer.component';
import { DeezerRedirectComponent } from './pages/deezer/deezer-redirect/deezer-redirect.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LoginFormComponent,
    RegisterFormComponent,
    PwdCheckValidatorDirective,
    NavbarsComponent,
    ProfileComponent,
    SpotifyComponent,
    SpotifyRedirectComponent,
    TablePlaylistsComponent,
    TableSongsComponent,
    SyncModalComponent,
    DeezerComponent,
    DeezerRedirectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
