import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../core/services/movie-service';
import { Movie } from '../../shared/models/movie-model';

@Component({
  selector: 'app-movie-details-component',
  imports: [],
  templateUrl: './movie-details-component.html',
  styleUrl: './movie-details-component.css',
})
export class MovieDetailsComponent {
  public movieId: string | null = null;
  public movie: Movie | undefined;
  public errorMessage: string | null = null;
  constructor(private route: ActivatedRoute, private movieService: MovieService) {}
  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const numericId = +idParam;
      this.movieService.getMovieById(numericId).subscribe({
        next: (data) => {
          this.movie = data;
          console.log('MovieDetailsComponent : Données reçues !', data);
        },
        error: (err) => {
          this.errorMessage = 'Impossible de charger les détails de ce film.';
          console.error('Une erreur est survenue:', err);
        },
        complete: () => {
          console.log("L'observable des détails du film est complété.");
        },
      });
    }
  }
}
