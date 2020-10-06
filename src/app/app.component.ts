import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent, Observable, of } from 'rxjs';
import { debounceTime, map, switchMap, tap } from 'rxjs/operators'
import { DataService, Movie } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private _data: DataService
  ) { }
  title = 'IMDbify';
  movies$: Observable<Movie[]>;
  autocomplete$: Observable<any>;

  @ViewChild('search', { static: true }) searchEl: ElementRef;

  ngOnInit() {

    this.autocomplete$ = fromEvent(this.searchEl.nativeElement, 'input')
      .pipe(
        map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
        debounceTime(1500),
        switchMap(searchKey => this._data.fetchMoviesByQuery(searchKey))
      )
    this.autocomplete$.subscribe(
      movies => {
        this.movies$ = of(movies);
      }
    )

  }

}
