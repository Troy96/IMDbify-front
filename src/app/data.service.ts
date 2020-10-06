import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as MOVIES from './movies.mock.json'

export interface Movie {
  id: number;
  name: string;
  image: string
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  movies: Movie[] = MOVIES;

  fetchMovies(): Observable<Movie[]> {
    return of(this.movies['default']);
  }

  fetchMovieById(id: number): Observable<Movie> {
    const movie = this.movies['default'].find(m => m.id === id);
    return of(movie);
  }

  fetchMoviesByQuery(query): Observable<Movie[]> {
    const movies = this.movies['default'].filter(m => m.name.includes(query))
    return of(movies);
  }

}
