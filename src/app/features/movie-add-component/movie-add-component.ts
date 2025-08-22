import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MovieService } from '../../core/services/movie-service';
import { Movie } from '../../shared/models/movie-model';

@Component({
  selector: 'app-movie-add-component',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './movie-add-component.html',
  styleUrl: './movie-add-component.css',
})
export class MovieAddComponent {
  public movieForm: FormGroup;
  public errorMessage: string | null = null;
  constructor(
    private fb: FormBuilder,
    private movieService: MovieService // private movie: Movie
  ) {
    this.movieForm = this.fb.group({
      title: ['', [Validators.required]],
      director: ['', [Validators.required]],
      year: ['', [Validators.required]],
      poster: [''],
      synopsis: [''],
    });
  }

  onSubmit(): void {
    if (this.movieForm.invalid) {
      this.movieForm.markAllAsTouched();
      return;
    }
    let movie: Movie = this.movieForm.value;
    this.movieService.postMovie(movie).subscribe({
      next: (created) => {
        console.log('Film créé :', created);
      },
      error: (err) => {
        console.error('Erreur création film :', err);
        this.errorMessage = 'Impossible de créer le film.';
      },
    });
  }
}
