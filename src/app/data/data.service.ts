import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject, EMPTY, ReplaySubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private items$: Subject<any[]> = new ReplaySubject(1);
  private info$: Subject<any> = new Subject();

  readonly baseUrl = 'https://rickandmortyapi.com/api';

  get items(): Observable<any[]> {
    return this.items$.asObservable();
  }

  get info(): Observable<any> {
    return this.info$.asObservable();
  }

  constructor(private httpClient: HttpClient) { }

  search(opts: {url?: string, search?: string, gender?: string}): Observable<void> {
    let params = new HttpParams();
    const url = opts.url || `${this.baseUrl}/character`;

    params = opts.search ? params.append('name', opts.search) : params;
    params = opts.gender ? params.append('gender', opts.gender) : params;

    return this.httpClient.get(url, { params }).pipe(
      tap((data: any) => {
        this.items$.next(data.results);
        this.info$.next(data.info);
      }),
      catchError(() => {
        this.items$.next([]);
        this.info$.next({});
        return EMPTY;
      })
    );
  }
}
