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

  public onMovieClick() {
    this.movieId.emit(this.movie.id);
  }

}
