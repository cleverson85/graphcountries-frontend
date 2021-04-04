import { Country } from './../../models/country';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { CountryService } from 'src/app/providers/country.service';

import { SearchValue } from 'src/app/shared/searchValue.enum';
import { ToasterService } from 'src/app/providers/common/toaster.service';
import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  subscription = new Subscription();
  placeholder = 'Country';
  searchValue = SearchValue.Country;
  countries: Country[] = [];

  constructor(private countryService: CountryService,
              private toasterService: ToasterService,
              private authService: AuthService) { }

  ngOnInit() {
    this.userAutheticated();
    this.getCoutries();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getCoutries(page?: number) {
    this.subscription.add(
      this.countryService.getCountries(page).subscribe((result: any) => {
        this.countries = result.Country;

        // this.countryService.getCountriesFromCustoAPI().subscribe((res: any) => {
        //   debugger;
        //   const coutriesMap = res.map((e: any) => {
        //     e._id = e.id;
        //     return e;
        //   })

        //   debugger;

        //   this.countries.push(...coutriesMap);
        // })
      })
    );
  }

  onPageChange(page: any) {
    this.getCoutries(page);
  }

  find(valueToSearch: string) {
    this.subscription.add(
      this.countryService.getCountryByValue(this.searchValue, valueToSearch)
        .subscribe((result: any) => {
          const { Country } = result;
          this.countries = Country;

          if (this.countries.length <= 0) {
            this.toasterService.showToastWarning('Nothing information was found.');
          }
      })
    );
  }

  changePlaceholder(type: string, searchValue: string) {
    this.placeholder = type;
    this.searchValue = searchValue as SearchValue;
  }

  userAutheticated(): boolean {
    return this.authService.tempUser;
  }
}
