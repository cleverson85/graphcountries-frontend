import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.error(`Erro: ${operation} Falha: ${error.message}`);
      return of(result as T);
    };
  }
}
