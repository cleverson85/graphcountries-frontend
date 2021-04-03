import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CardCountryComponent } from './card-country.component';
import { CountryModule } from 'src/app/pages/country/country.module';

@NgModule({
  declarations: [
    CardCountryComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CountryModule
  ],
  exports: [
    CardCountryComponent
  ],
  bootstrap: [
    CardCountryComponent
  ]
})
export class CardCountryModule { }
