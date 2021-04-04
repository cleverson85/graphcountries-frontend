import { Token } from './token.enum';
import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {

        console.error(`Code: ${error.status}, ` + `Erro: ${JSON.stringify(error.error)}`);

        if (error.status === 401) {
          sessionStorage.removeItem(Token.Key);
          return throwError(
            `Não foi possível realizar a operação.`
          );
        }

        if (error.status >= 500) {
          return throwError(
            `Não foi possível realizar a operação, tente novamente mais tarde.`
          );
        }
      })
    );
  }
}
