import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { get } from 'lodash';

import { SearchParams, Page, Character } from './data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  readonly baseUrl = 'https://rickandmortyapi.com/api';

  constructor(private httpClient: HttpClient) { }

  getCharacters(param: string | SearchParams): Observable<Page> {
    let httpParams = new HttpParams();
    const url = typeof(param) === 'string' ? param : `${this.baseUrl}/character`;
    const name = get(param, 'name');
    const gender = get(param, 'gender');

    httpParams = name ? httpParams.append('name', name) : httpParams;
    httpParams = gender ? httpParams.append('gender', gender) : httpParams;

    return this.httpClient.get(url, { params: httpParams }).pipe(
      map((data: any) => {
        return {
          prev: data.info.prev,
          next: data.info.next,
          items: data.results
        };
      }),
      catchError(() => of({ items: []}))
    );
  }

  getCharacter(id: string): Observable<Character> {
    const url = `${this.baseUrl}/character/${id}`;
    return this.httpClient.get<Character>(url);
  }
}
