import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

import { ApiRoute } from './../../shared/apiRoutes.enum';
import { CountryService } from '../../providers/country.service';
import { ToasterService } from 'src/app/providers/common/toaster.service';
import { AuthService } from 'src/app/providers/auth.service';

import { Country } from 'src/app/models/country';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  subscription = new Subscription();
  country: Country;
  ontherCountries: any;
  titulo: string;
  submitted = false;

  constructor(private countryService: CountryService,
              private formBuilder: FormBuilder,
              private location: Location,
              private activatedRoute: ActivatedRoute,
              private toaster: ToasterService,
              private authService: AuthService) { }

  ngOnInit() {
    this.country = this.activatedRoute.snapshot.data['country'];

    this.formGroup = this.formBuilder.group({
      id: [ this.country?._id || 0],
      name: [ this.country?.name, Validators.required ],
      capital: [ this.country?.capital, Validators.required ],
      area: [ this.country?.area.toLocaleString(), Validators.required ],
      population: [ (this.country?.population / 100).toFixed(2), Validators.required ],
      populationDensity: [  (this.country?.populationDensity / 100).toFixed(2), Validators.required ],
      languages: [ this.country?.officialLanguages?.map(e => e.nativeName).join(', '), Validators.required ],
      domain: [ this.country?.topLevelDomains?.map(e => e.name ).join(', '), Validators.required ],
    });

    if (this.country) {
      this.configureTitle(this.country);
      this.configureOtherCountries(this.country);
      this.userAutheticated();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  hasError(field: string) {
    return this.formGroup.get(field).errors;
  }

  save() {
    this.submitted = true;

    if (this.formGroup.valid) {
      this.subscription.add(this.countryService.save<Country>(this.formGroup.value, ApiRoute.POST)
        .subscribe((result: any) => {
          this.toaster.showToastSuccess('Operação efetuada com sucesso.');
          this.location.back();
        },
        (e: any) => {
          this.toaster.showToastError(e);
        })
      );
    }
  }

  configureOtherCountries(country: Country) {
    country.distanceToOtherCountries
      .forEach((e: any) => {
        e.distanceInKm = e.distanceInKm.toLocaleString();
      });

    this.ontherCountries = this.country.distanceToOtherCountries;
  }

  configureTitle(country: Country) {
    this.titulo = country._id > 0 ? 'Edit Country ' : 'Register Country';
  }

  userAutheticated(): boolean {
    return this.authService.tempUser;
  }
}
