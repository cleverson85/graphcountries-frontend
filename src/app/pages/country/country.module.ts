import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CountryComponent } from './country.component';

import { CountryRoutingModule } from './country-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    CountryComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CountryRoutingModule,
    SharedModule,
  ],
})
export class CountryModule { }
