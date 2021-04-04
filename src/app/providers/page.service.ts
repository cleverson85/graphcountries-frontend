import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { CountryQuery } from '../data/queries/country.query';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  pageSubject$ = new BehaviorSubject<any>({});
  page$ = this.pageSubject$.asObservable();

  constructor(protected apollo: Apollo) { }

  getPageCount(): Observable<any> {
    return this.apollo
      .watchQuery({
        query: CountryQuery.queryCount(),
      })
      .valueChanges.pipe(
        map((result: any) => {
          const { Country } = result.data;
          return Country;
        })
      );
  }

  setPage(value: any) {
    this.pageSubject$.next(value);
  }
}
