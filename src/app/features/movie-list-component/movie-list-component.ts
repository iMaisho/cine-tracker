import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../core/services/movie-service';
import { Movie } from '../../shared/models/movie-model';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-list-component',
  imports: [RouterLink],
  templateUrl: './movie-list-component.html',
  styleUrl: './movie-list-component.css',
})
export class MovieListComponent implements OnInit {
  page = 1;
  limit = 10;
  private fetch$!: Observable<Movie[]>;
  public movies: Movie[] = [];
  public isLoading: boolean = true;
  public errorMessage: string | null = null;
  total$!: Observable<number>;
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    {
      this.movieService.getMovies(this.page, this.limit).subscribe({
        next: (data) => {
          this.movies = data;
          this.isLoading = false;
          console.log('MovieListComponent : Données reçues !', data);
        },
        error: (err) => {
          this.errorMessage = 'Impossible de charger les films.';
          this.isLoading = false;
          console.error('Une erreur est survenue:', err);
        },
        complete: () => {
          console.log("L'observable des films est complété.");
        },
      });
    }
  }

  onError(event: any) {
    const image = event.target as HTMLImageElement;
    image.src = 'https://i.pinimg.com/736x/f3/9d/be/f39dbeaafd5e8e4ba3229e34f6aa0db0.jpg';
  }
}
