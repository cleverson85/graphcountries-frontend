import { Country } from './../../models/country';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/providers/auth.service';
import { ToasterService } from 'src/app/providers/common/toaster.service';
import { CountryService } from 'src/app/providers/country.service';

import { SearchValue } from 'src/app/shared/searchValue.enum';

import { PaginationComponent } from 'src/app/components/pagination/pagination.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild(PaginationComponent) childPagination: PaginationComponent;

  subscription = new Subscription();
  placeholder = 'Country';
  searchValue = SearchValue.Country;
  countries: any;

  constructor(
    private countryService: CountryService,
    private toasterService: ToasterService,
    private authService: AuthService,
    private toaster: ToasterService
  ) { }

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
        this.countries = this.configureWithId(result.Country);

        this.countryService.getCountriesFromCustoAPI().subscribe((custom: any) => {

          this.countries = this.countryService.configureContriesChanged(this.countries, custom);

          if (this.isLastPage()) {
              if (this.countries.length == 0) {
                this.countries = [];
                const values = custom.filter((e) => (e.id >= 500));
                this.countries.push(...values);
              }
          }
        });
      })
    );
  }

  isLastPage(): boolean {
    const currentPage = this.childPagination?.config.currentPage;
    const totalPages = this.childPagination?.totalPages;
    return currentPage == totalPages;
  }

  configureWithId(list: Country[]): Country[] {
    list = list.map((e: any) => {
      e.id = e._id;
      return e;
    });

    return list;
  }

  onPageChange(page: any) {
    this.getCoutries(page);
  }

  find(valueToSearch: string) {
    if (valueToSearch == '') {
      this.toaster.showToastWarning('Nenhum valor para pesquisa foi informado.');
      return;
    }

    this.countries = [];

    this.subscription.add(
      this.countryService.getCountryByValue(this.searchValue, valueToSearch)
        .subscribe((result: any) => {
          const { Country } = result;
          this.countries = Country;
        }),
    );

    this.subscription.add(
      this.countryService.getCountryByValueCustomApi(this.searchValue, valueToSearch)
        .subscribe((result: any) => {
            debugger;
            this.countries.push(...result);

          if (this.countries.length == 0 && result.length == 0) {
            this.toasterService.showToastWarning('Nenhuma informação encontrada.');
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
