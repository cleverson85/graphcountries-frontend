import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Country } from '../models/country';
import { SearchValue } from '../shared/searchValue.enum';

import { CountryQuery } from './../data/queries/country.query';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(protected apollo: Apollo) { }

  getCountryByValue(searchValue: SearchValue, valueToSearch: string): Observable<any> {
    debugger;
    if (searchValue == SearchValue.Country) {
      return this.getCountryByName(valueToSearch);
    } else if (searchValue == SearchValue.Capital) {
      return this.getCountryByCapitalName(valueToSearch);
    }

    return this.getCountries(0);
  }

  getCountryByCapitalName(capitalName: string): Observable<any> {
    return this.apollo
      .watchQuery({
        query: CountryQuery.queryCountryByCapitalName(),
        variables: { capitalName },
      })
      .valueChanges.pipe(
        map((result: any) => {
          return result.data;
        })
      );
  }

  getCountryByName(name: string): Observable<any> {
    return this.apollo
      .watchQuery({
        query: CountryQuery.queryCountryByName(),
        variables: { name },
      })
      .valueChanges.pipe(
        map((result: any) => {
          return result.data;
        })
      );
  }

  getCountries(page: number = 0): Observable<any> {
    return this.apollo
      .watchQuery({
        query: CountryQuery.queryCountryPage(),
        variables: { page },
      })
      .valueChanges.pipe(
        shareReplay(1),
        map((result: any) => {
          return result.data;
        })
      );
  }

  getCountriesById(id: string): Observable<Country> {
    return this.apollo
    .query({
      query: CountryQuery.queryCountryById(),
      variables: { id },
    }).pipe(
      map((result: any) => {
        const { Country } = result.data;
        return Country[0] as Country;
      })
    );
  }
}
