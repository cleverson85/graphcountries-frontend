import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

import { CountryService } from '../../providers/country.service';
import { ToasterService } from 'src/app/providers/common/toaster.service';

import { Country } from 'src/app/models/Country';

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
              private toaster: ToasterService) { }

  ngOnInit() {
    this.country = this.activatedRoute.snapshot.data['country'];

    this.formGroup = this.formBuilder.group({
      id: [ this.country?._id ],
      name: [ this.country?.name, Validators.required ],
      capital: [ this.country?.capital, Validators.required ],
      area: [ this.country?.area.toLocaleString(), Validators.required ],
      population: [ this.country?.population.toLocaleString(), Validators.required ],
      populationDensity: [ this.country?.populationDensity.toLocaleString(), Validators.required ],
      languages: [ this.country?.officialLanguages?.map(e => e.nativeName).join(', '), Validators.required ],
      domain: [ this.country?.topLevelDomains?.map(e => e.name ).join(', '), Validators.required ],
    });

    this.configureTitle(this.country);
    this.configureOtherCountries(this.country);
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
      // this.subscription.add(this.CountryService.saveCountry(this.formGroup.value)
      //   .subscribe((result: any) => {
      //     const { message, id } = result;

      //     this.toaster.showToastSuccess(message);
      //     this.location.back();
      //   },
      //   (e: HttpErrorResponse) => {
      //     const { error } = e;
      //     this.toaster.showToastError(error.message);
      //   })
      // );
    }
  }

  configureOtherCountries(country: Country) {
    this.country.distanceToOtherCountries
      .forEach((e: any) => {
        e.distanceInKm = e.distanceInKm.toLocaleString();
      });

    this.ontherCountries = this.country.distanceToOtherCountries;
  }

  configureTitle(country: Country) {
    this.titulo = country._id > 0 ? "Edit Country " : "Register Country"
  }
}
