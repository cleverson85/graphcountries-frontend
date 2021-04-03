import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
  // },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canActivate: [ AuthGuard ],
  },
  {
    path: 'country',
    loadChildren: () => import('./pages/country/country.module').then(m => m.CountryModule),
    canActivate: [ AuthGuard ],
    canLoad: [ AuthGuard ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
