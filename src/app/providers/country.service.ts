import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { Country } from '../models/country';
import { ApiRoute } from '../shared/apiRoutes.enum';
import { SearchValue } from '../shared/searchValue.enum';

import { CountryQuery } from './../data/queries/country.query';
import ApiBase from './common/apiBase.service';

@Injectable({
  providedIn: 'root',
})
export class CountryService extends ApiBase {

  countriesDelete: any = [];

  getCountryByValue(searchValue: SearchValue, valueToSearch: string): Observable<any> {
    if (valueToSearch != '') {
      if (searchValue == SearchValue.Country) {
        return this.getCountryByName(valueToSearch);
      } else if (searchValue == SearchValue.Capital) {
        return this.getCountryByCapitalName(valueToSearch);
      }
    }

    return this.getCountries(0);
  }

  getCountryByValueCustomApi(searchValue: SearchValue, valueToSearch: string): Observable<any> {
    if (valueToSearch != '') {
      if (searchValue == SearchValue.Country) {
        return this.getCountryByNameCustomApi(valueToSearch);
      } else if (searchValue == SearchValue.Capital) {
        return this.getCountryByCapitalNameCustomApi(valueToSearch);
      }
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

  getCountryByCapitalNameCustomApi(capitalName: string): Observable<any> {
    return this.get<number>(ApiRoute.GETBY_CAPITAL_NAME + capitalName)
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  }

  getCountryByNameCustomApi(countryName: string): Observable<any> {
    return this.get<number>(ApiRoute.GETBY_COUNTRY_NAME + countryName)
      .pipe(
        map((result: any) => {
          return result;
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

  getCountCountriesFromCustoAPI(): Observable<number> {
    return this.get<number>(ApiRoute.GET_COUNT);
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
          let data = Country[0];
          data['id'] = data._id;
          return data;
        })
      );
  }

  getCountriesByIdFromCustomApi(id: number): Observable<any> {
    return this.getById<Country>(ApiRoute.GETBY_ID, id)
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  }

  configureContriesChanged(countries: any, custom: any) {
    return countries.map((element: Country) => {
      let changed = custom.find((f: Country, i: number) => {
        if (f.id == element.id) {
          let aux = f;
          this.countriesDelete.push(custom.splice(i, 1));
          return aux;
        }
      })

      element['changed'] = false;
      if (changed) {
        element = changed;
        element['changed'] = true;
      }

      return element;
    });
  }
}
