import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { CountryQuery } from '../data/queries/country.query';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PageService {

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

}
