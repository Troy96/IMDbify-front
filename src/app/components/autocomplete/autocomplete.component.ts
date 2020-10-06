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
  hasMovies: boolean = true;
  @ViewChild('search', { static: true }) searchEl: ElementRef;


  constructor(
    private _data: DataService
  ) { }

  ngOnInit(): void {

    this.autocomplete$ = fromEvent(this.searchEl.nativeElement, 'input')
      .pipe(
        map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
        debounceTime(1500),
        switchMap(searchKey => searchKey ? this._data.fetchMoviesByQuery(searchKey) : of(''))
      )
    this.autocomplete$.subscribe(
      movies => {
        this.hasMovies = true;
        this.movies$ = of(movies);
        if (!Array.isArray(movies)) this.hasMovies = false;
      }
    )

  }

  onMovieClick(id: number) {
    alert(`You clicked on movie with id ${id}`)
  }

}
