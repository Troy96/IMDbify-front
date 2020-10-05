import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  ngOnInit() {
    this.movies$ = this._data.fetchMovies();
  }


}
