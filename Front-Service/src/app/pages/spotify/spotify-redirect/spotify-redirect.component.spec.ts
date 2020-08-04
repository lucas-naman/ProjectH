import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyRedirectComponent } from './spotify-redirect.component';

describe('SpotifyRedirectComponent', () => {
  let component: SpotifyRedirectComponent;
  let fixture: ComponentFixture<SpotifyRedirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotifyRedirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifyRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
