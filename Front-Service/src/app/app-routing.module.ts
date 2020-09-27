import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './_helpers';
import { NavbarsComponent } from './_nav/navbars/navbars.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SpotifyComponent } from './pages/spotify/spotify.component';
import { SpotifyRedirectComponent } from './pages/spotify/spotify-redirect/spotify-redirect.component';
import { DeezerComponent } from './pages/deezer/deezer.component';
import { DeezerRedirectComponent } from './pages/deezer/deezer-redirect/deezer-redirect.component';
const routes: Routes = [
    {
      path: '',
      component: NavbarsComponent,
      canActivate: [AuthGuard],
      children: [
        { path: 'home', component: HomeComponent },
        { path: 'profile', component: ProfileComponent },
        { path: 'spotify', component: SpotifyComponent },
        { path: 'spotify_redirect', component: SpotifyRedirectComponent },
        { path: 'deezer', component: DeezerComponent },
        { path: 'deezer_redirect', component: DeezerRedirectComponent },
      ]
    },

    { path: 'login', component: LoginComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
