import { Country } from 'src/app/models/country';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-card-country',
  templateUrl: './card-country.component.html',
  styleUrls: ['./card-country.component.scss'],
})
export class CardCountryComponent implements OnInit {
  @Input() country: Country;

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() { }

  Edit() {
    this.router.navigate([`country/country-edit/${this.country.id}/${this.country?.changed}`]);
  }
}
