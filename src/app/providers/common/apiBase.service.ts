import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HandleErrorService } from '../handleError.service';

import { RoutesApi } from 'src/app/shared/routesAPI.enum';
import { Environment } from 'src/app/environment.service';

@Injectable({
  providedIn: 'root'
})
class ApiBase {
  private readonly API = Environment.settings.apiCustom.url;

  constructor(private httpClient: HttpClient,
              private handleErrorService: HandleErrorService) { }

  get<T>(route: string): Observable<T[]> {
    return this.httpClient.get<T[]>(this.API + route)
                          .pipe(
                            retry(3),
                            catchError(this.handleErrorService.handleError<T[]>(`GET ${route}`))
                          );
  }

  getById<T>(route: string): Observable<T> {
    return this.httpClient.get<T>(this.API + route)
                          .pipe(
                            retry(3),
                            catchError(this.handleErrorService.handleError<T>(`GET_ID ${route}`))
                          );
  }

  update<T>(Entity: T, route: string): Observable<T> {
    return this.httpClient.put<T>(this.API + route, Entity)
                          .pipe(
                            catchError(this.handleErrorService.handleError<T>(`UPDATE ${route}`, Entity))
                          );
  }

  save<T>(Entity: T, route: string): Observable<T> {
    return this.httpClient.post<T>(this.API + route, Entity)
                          .pipe(
                            catchError(this.handleErrorService.handleError<T>(`SAVE ${route}`, Entity))
                          );
  }

  delete<T>(id: number, route: string): Observable<T> {
    return this.httpClient.delete<T>(this.API + route + '/' + id)
                          .pipe(
                            catchError(this.handleErrorService.handleError<T>(`DELETE ${route}`))
                          );
  }
}

export default ApiBase;
