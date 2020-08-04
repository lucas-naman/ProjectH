import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-navbars',
  templateUrl: './navbars.component.html',
  styleUrls: ['./navbars.component.css']
})
export class NavbarsComponent implements OnDestroy {

  mobileQuery: MediaQueryList;

  links = [
    { link: "/home", icon:"/assets/iconss/home.png", text:"Home" },
    { link:"/spotify", icon:"/assets/iconss/spotify.png", text:"Spotify" },
    // { link:"/youtube", icon:"/assets/iconss/youtube.png", text:"Youtube" },
    // { link:"/amazon", icon:"/assets/iconss/amazon-music.png", text:"Amazon Music" },
    // { link:"/deezer", icon:"/assets/iconss/deezer.png", text:"Deezer" },
  ]

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authenticationService: AuthenticationService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout() {
    this.authenticationService.logout()
  }

}
