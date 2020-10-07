import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as MOVIES from '../mocks/movies.mock.json';
import { Movie } from '../interfaces/movie.interface';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private _http: HttpClient
  ) { }

  movies: Movie[] = MOVIES;

  fetchMovies(): Observable<Movie[]> {
    //return of(this.movies['default']);
    return this._http.get<Movie[]>(environment.apiUrl + '/movies')
  }

  fetchMoviesByQuery(query): Observable<Movie[]> {
    // const movies = this.movies['default'].filter(m => m.name.includes(query))
    // return of(movies);

    return this._http.get<Movie[]>(environment.apiUrl + '/movies/?search=' + query)
  }

}
