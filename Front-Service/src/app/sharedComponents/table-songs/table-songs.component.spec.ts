import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSongsComponent } from './table-songs.component';

describe('TableSongsComponent', () => {
  let component: TableSongsComponent;
  let fixture: ComponentFixture<TableSongsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableSongsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
