import { Component, OnInit, ViewChild, ElementRef, HostListener, ViewChildren, QueryList, Renderer2 } from '@angular/core';
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
  moviesElList: Array<ElementRef> = [];
  focusedMovieIndex: number = 0;
  @ViewChild('search', { static: true }) searchEl: ElementRef;
  @ViewChildren('movies') moviesEl: QueryList<ElementRef>;

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    if (event.code == 'ArrowUp') {

      if (this.focusedMovieIndex == 0) return;
      this.focusedMovieIndex--;

      this.removeFocusedElement();
      this.applyFocus()
    }
    if (event.code == 'ArrowDown') {
      const moviesLength = this.moviesElList[0].nativeElement.children.length;
      if (moviesLength - this.focusedMovieIndex == 1) return;
      this.focusedMovieIndex++;

      this.removeFocusedElement();
      this.applyFocus()

    }
  }


  constructor(
    private _data: DataService,
    private _renderer: Renderer2
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
        this.focusedMovieIndex = 0;
        this.movies$ = of(movies);
        this.moviesElList = this.moviesEl.toArray();
        if (!Array.isArray(movies) || ((Array.isArray(movies) && !movies.length))) return this.hasMovies = false;

        setTimeout(() => {
          this.applyFocus();
        }, 0);
      }
    )

  }
  
  /**
   * Applies the class `focus` to the element with index  as `focusedMovieIndex`
   */
  applyFocus() {
    const movie = this.moviesElList[0].nativeElement.children[this.focusedMovieIndex].children[0];
    this._renderer.addClass(movie, 'focus');
  }

  /**
   * Finds and return the index of the movie element having class `focus`
   * @returns index
   */
  getElementIndexWithFocus() {
    const children = this.moviesElList[0].nativeElement.children;
    let index;

    for (let i = 0; i < children.length; i++) {
      if (children[i].children[0].className.includes('focus')) {
        index = i;
        break;
      };
    }
    return index;
  }

  /**
   * Removes the class `focus` from the movie element
   */
  removeFocusedElement() {
    const i = this.getElementIndexWithFocus();
    this._renderer.removeClass(this.moviesElList[0].nativeElement.children[i].children[0], 'focus');
  }

  /**
   * Gets the child movie id and alerts on the screen
   * @param id
   */
  onMovieClick(id: number) {
    alert(`You clicked on movie with id ${id}`)
  }

}
