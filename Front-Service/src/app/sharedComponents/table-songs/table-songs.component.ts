import { Component, OnInit, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-table-songs',
  templateUrl: './table-songs.component.html',
  styleUrls: ['./table-songs.component.css']
})
export class TableSongsComponent implements OnInit {

  displayedColumns: string[] = ['index', 'name', 'album'];
  isMobile = false;


  @Input() songs: any;

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 500px)');
    this.displayedColumns = (this.isMobile ? ['name'] : ['index', 'name', 'album']);
    this.breakpointObserver.observe(['(max-width: 500px)'])
    .subscribe(result => {
      if (result.matches) {
        this.isMobile = true;
        this.displayedColumns = ['name'];
      } else {
        this.isMobile = false;
        this.displayedColumns = ['index', 'name', 'album'];
      }
    });
  }

}
