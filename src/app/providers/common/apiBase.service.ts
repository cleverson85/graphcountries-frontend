import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Environment } from 'src/app/environment.service';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
class ApiBase {
  private readonly API = Environment.settings.apiCustom.url;

  constructor(private httpClient: HttpClient,
              protected apollo: Apollo) { }

  get<T>(route: string): Observable<T> {
    return this.httpClient.get<T>(this.API + route);
  }

  getById<T>(route: string): Observable<T> {
    return this.httpClient.get<T>(this.API + route);
  }

  update<T>(Entity: T, route: string): Observable<T> {
    return this.httpClient.put<T>(this.API + route, Entity);
  }

  save<T>(Entity: T, route: string): Observable<T> {
    return this.httpClient.post<T>(this.API + route, Entity);
  }

  delete<T>(id: number, route: string): Observable<T> {
    return this.httpClient.delete<T>(this.API + route + '/' + id);
  }
}

export default ApiBase;
