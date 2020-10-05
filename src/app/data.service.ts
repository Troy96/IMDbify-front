import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as MOVIES from './movies.mock.json'

export interface Movie {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  Movies: Movie[] = MOVIES;

  fetchMovies(): Observable<Movie[]> {
    return of(this.Movies)
  }

  fetchMovieById(id: number): Observable<Movie> {
    const movie = this.Movies.find(m => m.id === id);
    return of(movie);
  }

}
