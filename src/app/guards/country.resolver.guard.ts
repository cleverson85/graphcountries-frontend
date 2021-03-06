import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';

import { Country } from '../models/country';
import { CountryService } from '../providers/country.service';

@Injectable({
  providedIn: 'root',
})
export class CountryResolverGuard implements Resolve<any> {
  constructor(private countryService: CountryService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<any> {
    if (route.params && route.params['id'] && route.params['changed']) {

      if (route.params['changed'] == 'true') {
        return this.countryService.getCountriesByIdFromCustomApi(route.params['id']);
      }

      return this.countryService.getCountriesById(route.params['id']);
    }
   }
}
