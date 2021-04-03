import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  loadingSubject$ = new BehaviorSubject<string>('Carregando...');
  loading$ = this.loadingSubject$.asObservable();

  constructor() {}

  setTextLoading(text: string) {
    this.loadingSubject$.next(text);
  }
}
