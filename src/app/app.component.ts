import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private _data: DataService
  ) { }
  title = 'IMDbify';

  fetchMovies() {
    try {
      const movies = this._data.fetchMovies().toPromise();
      return movies;
    } catch (e) {
      console.warn(e);
    }
  }
}
