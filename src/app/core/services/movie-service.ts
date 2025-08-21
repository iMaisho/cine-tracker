import { Injectable } from '@angular/core';
import { Movie } from '../../shared/models/movie-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  public getMovies(page: number, limit: number): Observable<Movie[]> {
    console.log("MovieService: Appel de l'API pour récupérer les films");
    return this.http.get<Movie[]>(`http://localhost:3000/movies?_page=${page}&_limit=${limit}`);
  }
}
