import { Country } from './../../models/country';
import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { CountryService } from 'src/app/providers/country.service';
import { ModalService } from 'src/app/providers/modal.service';
import { PageService } from 'src/app/providers/page.service';

import { PaginationComponent } from 'src/app/components/pagination/pagination.component';
import { SearchValue } from 'src/app/shared/searchValue.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  subscription = new Subscription();
  placeholder = 'Country';
  searchValue = SearchValue.Country;
  countries: Country[] = [];

  constructor(
    private CountryService: CountryService,
    private modalService: ModalService,
    private pageService: PageService
  ) { }

  ngOnInit() {
    this.getCoutries();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getCoutries(page?: number) {
    this.subscription.add(
      this.CountryService.getCountries(page).subscribe((result: any) => {
        const { Country } = result;
        this.countries = Country;
      })
    );
  }

  onPageChange(page: any) {
    this.getCoutries(page);
  }

  find(valueToSearch: string) {
    this.subscription.add(
      this.CountryService.getCountryByValue(this.searchValue, valueToSearch)
        .subscribe((result: any) => {
          const { Country } = result;
          this.countries = Country;
      })
    );
  }

  changePlaceholder(type: string, searchValue: string) {
    this.placeholder = type;
    this.searchValue = searchValue as SearchValue;
  }
}
