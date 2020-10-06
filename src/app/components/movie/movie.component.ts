import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie.interface';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  @Input() movie: Movie;
  @Output() movieId = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Click handler for movie click. Emits the movie id to the parent component which simply alerts it
   */
  public onMovieClick() {
    this.movieId.emit(this.movie.id);
  }

}
