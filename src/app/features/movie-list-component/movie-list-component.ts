import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MovieService } from '../../core/services/movie-service';
import { Movie } from '../../shared/models/movie-model';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-movie-list-component',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './movie-list-component.html',
  styleUrl: './movie-list-component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListComponent implements OnInit {
  page = 1;
  limit = 10;
  private fetch$!: Observable<Movie[]>;
  public movies: Movie[] = [];
  public isLoading: boolean = true;
  public errorMessage: string | null = null;
  total$!: Observable<number>;
  searchControl = new FormControl('');

  constructor(private movieService: MovieService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((term) => {
        this.page = 1; // reset pagination
        this.loadMovies(term || '');
      });

    // Chargement initial
    this.loadMovies();
  }

  private loadMovies(term: string = '') {
    this.isLoading = true;
    this.movieService.getMovies(this.page, this.limit, term).subscribe({
      next: (data) => {
        this.movies = data;
        this.cdr.markForCheck();
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Impossible de charger les films.';
        this.isLoading = false;
        console.error(err);
      },
    });
  }

  onError(event: any) {
    const image = event.target as HTMLImageElement;
    image.src = 'https://i.pinimg.com/736x/f3/9d/be/f39dbeaafd5e8e4ba3229e34f6aa0db0.jpg';
  }
}
