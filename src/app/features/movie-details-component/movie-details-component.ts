import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService } from '../../core/services/movie-service';
import { Movie } from '../../shared/models/movie-model';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-movie-details-component',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './movie-details-component.html',
  styleUrl: './movie-details-component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailsComponent implements OnInit {
  public movieId: string | null = null;
  public movie: Movie | undefined;
  public errorMessage: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const numericId = +idParam;
      this.movieService.getMovieById(numericId).subscribe({
        next: (data) => {
          this.movie = data;
          this.cdr.markForCheck();

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
  onError(event: any) {
    const image = event.target as HTMLImageElement;
    image.src = 'https://i.pinimg.com/736x/f3/9d/be/f39dbeaafd5e8e4ba3229e34f6aa0db0.jpg';
  }
}
