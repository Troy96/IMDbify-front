import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent, Observable, of } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators'
import { DataService } from '../../services/data.service';
import { Movie } from '../../interfaces/movie.interface';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {

  movies$: Observable<Movie[]>;
  autocomplete$: Observable<any>;
  @ViewChild('search', { static: true }) searchEl: ElementRef;


  constructor(
    private _data: DataService
  ) { }

  ngOnInit(): void {

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
