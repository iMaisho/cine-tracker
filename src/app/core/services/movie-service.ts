import { Injectable } from '@angular/core';
import { Movie } from '../../shared/models/movie-model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  url = `http://localhost:3000/movies`;

  constructor(private http: HttpClient) {}

  public getMovies(page: number, limit: number, searchTerm?: string): Observable<Movie[]> {
    const params: any = { _page: page, _limit: limit };
    if (searchTerm && searchTerm.trim().length > 0) {
      params.title = searchTerm.trim();
    }

    return this.http.get<Movie[]>(this.url, { params });
  }

  public getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(this.url + `/${id}`);
  }

  public postMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.url, movie);
  }

  public deleteMovieById(id: number): Observable<Movie> {
    return this.http.delete<Movie>(this.url + `/${id}`);
  }
}
