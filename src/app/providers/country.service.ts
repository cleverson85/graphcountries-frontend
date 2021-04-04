import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { Country } from '../models/country';
import { ApiRoute } from '../shared/apiRoutes.enum';
import { SearchValue } from '../shared/searchValue.enum';

import { CountryQuery } from './../data/queries/country.query';
import ApiBase from './common/apiBase.service';

@Injectable({
  providedIn: 'root',
})
export class CountryService extends ApiBase {

  getCountryByValue(searchValue: SearchValue, valueToSearch: string): Observable<any> {
    let countryList: any;

    if (valueToSearch != '') {
      if (searchValue == SearchValue.Country) {
        countryList = this.getCountryByName(valueToSearch);
      } else if (searchValue == SearchValue.Capital) {
        countryList = this.getCountryByCapitalName(valueToSearch);
      }

      return countryList;
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

  getCountries(page: number = 0): Observable<Country[]> {
    const itens = 9;
    const offset = 9 * page;

    return this.apollo
      .watchQuery({
        query: CountryQuery.queryCountryPage(),
        variables: { itens, offset },
      })
      .valueChanges.pipe(
        map((result: any) => {
          return result.data;
        })
      );
  }

  getCountriesFromCustoAPI(): Observable<Country[]> {
    return this.get<Country[]>(ApiRoute.GETALL);
  }

  getCountriesById(id: string): Observable<Country> {
    return this.apollo
      .query({
        query: CountryQuery.queryCountryById(),
        variables: { id },
      })
      .pipe(
        map((result: any) => {
          const { Country } = result.data;
          return Country[0] as Country;
        })
      );
  }
}
