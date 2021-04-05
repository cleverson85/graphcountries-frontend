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
  valid: boolean;
  lat: number = -23.8779431;
  lng: number = -49.8046873;
  zoom: number = 15;

  constructor(private countryService: CountryService,
              private formBuilder: FormBuilder,
              private location: Location,
              private activatedRoute: ActivatedRoute,
              private toaster: ToasterService,
              private authService: AuthService) { }

  ngOnInit() {
    this.country = this.activatedRoute.snapshot.data['country'];

    this.formGroup = this.formBuilder.group({
      id: [ this.country?.id || 0],
      name: [ this.country?.name, Validators.required ],
      capital: [ this.country?.capital, Validators.required ],
      area: [ (this.country?.area / 100).toFixed(2), Validators.pattern('^[a-zA-Z ]*') ],
      population: [ (this.country?.population / 100).toFixed(2), Validators.pattern('^[a-zA-Z ]*') ],
      populationDensity: [ (this.country?.populationDensity / 100).toFixed(2), Validators.pattern('^[a-zA-Z ]*') ],

      officialLanguages: [ this.configureLanguages(this.country), Validators.required ],
      topLevelDomains: [ this.configureDomains(this.country), Validators.required ],

      flag: [ this.country?.flag ],
      distanceToOtherCountries: [ this.country?.distanceToOtherCountries ],
      borders: [ this.country?.borders ],
      changed: true
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
    return this.formGroup.get(field)?.errors;
  }

  save() {
    this.submitted = true;

    if (this.formGroup.valid) {
      if (!this.country?.changed) {
        this.subscription.add(this.countryService.save<Country>(this.formGroup.value, ApiRoute.POST)
          .subscribe((result: any) => {
            this.toaster.showToastSuccess('Operação efetuada com sucesso.');
            this.location.back();
          },
          (e: any) => {
            this.toaster.showToastError(e);
          })
        );
      } else {
        this.subscription.add(this.countryService.update<Country>(this.formGroup.value, ApiRoute.PUT)
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
  }

  validateGraphCoutriesApi() {
    this.subscription.add(this.countryService.getCountryByName(this.formGroup.get('name').value)
      .subscribe((result) => {
        if (result.Country.length > 0) {
          this.toaster.showToastSuccess('Nome do país já se encontra registrado.');
          this.valid = true;
        }
      })
    )
  }

  configureOtherCountries(country: Country) {
    country.distanceToOtherCountries
      .forEach((e: any) => {
        e.distanceInKm = e.distanceInKm.toLocaleString();
      });

    this.ontherCountries = this.country.distanceToOtherCountries;
  }

  configureTitle(country: Country) {
    this.titulo = country.id > 0 ? 'Edit Country ' : 'Register Country';
  }

  configureLanguages(country: Country) {
    try {
      return country?.officialLanguages.map((e) => (e.nativeName)).join(', ');
    } catch (error) {
      return country?.officialLanguages;
    }
  }

  configureDomains(country: Country) {
    try {
      return country?.topLevelDomains.map((e) => (e.name)).join(', ');
    } catch (error) {
      return country?.topLevelDomains;
    }
  }

  userAutheticated() {
    this.valid = this.authService.tempUser;
  }
}
