import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountryComponent } from './country.component';
import { CountryResolverGuard } from 'src/app/guards/country.resolver.guard';

const routes: Routes = [
  { path: 'country-edit/:id', component: CountryComponent, resolve: { country: CountryResolverGuard } },
  { path: 'country-edit', component: CountryComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CountryRoutingModule { }
