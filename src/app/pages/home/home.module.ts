import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';

import { HomeRoutingModule } from './home-routing.module';
import { PaginationModule } from 'src/app/components/pagination/pagination.module';
import { CardCountryModule } from 'src/app/components/card-country/card-country.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PaginationModule,
    CardCountryModule
  ]
})
export class HomeModule { }
