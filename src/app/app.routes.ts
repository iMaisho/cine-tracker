import { Routes } from '@angular/router';
import { MovieDetailsComponent } from './features/movie-details-component/movie-details-component';
import { MovieListComponent } from './features/movie-list-component/movie-list-component';

export const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'movies', component: MovieListComponent },
  { path: 'movies/:id', component: MovieDetailsComponent },
];
