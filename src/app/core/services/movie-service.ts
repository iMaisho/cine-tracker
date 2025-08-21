import { Injectable } from '@angular/core';
import { Movie } from '../../shared/models/movie-model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  public xTotalCount = 0;
  constructor(private http: HttpClient) {}

  public getMovies(page: number, limit: number): Observable<Movie[]> {
    const url = `http://localhost:3000/movies`;
    return this.http
      .get<Movie[]>(url, { observe: 'response', params: { _page: page, _per_page: limit } })
      .pipe(map((res: HttpResponse<any>) => res.body.data ?? []));
  }
}
