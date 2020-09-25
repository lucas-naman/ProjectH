import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePlaylistsComponent } from './table-playlists.component';

describe('TablePlaylistsComponent', () => {
  let component: TablePlaylistsComponent;
  let fixture: ComponentFixture<TablePlaylistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablePlaylistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
