import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {mergeMap, startWith} from 'rxjs/operators';
import {environment} from '../environments/environment';

@Injectable()
export class PlosService {
  url = environment.url;

  constructor(private _httpClient: HttpClient) {
  }
  findArticle(query: string): Observable<any> {
    const url = `${this.url}&srsearch=${query}`;
    return this._httpClient.get(url).pipe(
      mergeMap(
        (respuesta: any) => {
          if (respuesta.query) {
            return of(respuesta.query.search);
          }
          return of([]);
        }
      )
    );
  }
}
