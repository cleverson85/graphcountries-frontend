import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from './providers/auth.service';
import { PageService } from './providers/page.service';
import { CountryService } from './providers/country.service';
import { Country } from './models/country';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  subscription = new Subscription();
  mostrarMenu = false;

  constructor(private authService: AuthService,
              private pageService: PageService,
              private countryService: CountryService) { }

  ngOnInit() {
    this.authService.mostrarMenuEmitter.subscribe((mostrar: boolean) => {
      this.mostrarMenu = mostrar;
    });

    this.pageService.getPageCount().subscribe((result: number) => {
      this.countryService.getCountCountriesFromCustoAPI().subscribe((count: number) => {
        const totalPages = result + count;
        let pages = [];

        let index = 0;
        while (index < totalPages) {
          pages.push(index);
          index++;
        }
        this.pageService.setPage(pages);
      });
    });
  }
}
