export interface Country {
  id: number;
  name: string;
  flag: {
    svgFile: string;
  };
  capital: string;
  area: number;
  population: number;
  populationDensity: number;
  officialLanguages: OfficialLanguages[];
  topLevelDomains: TopLevelDomains[];
  borders: Borders[];
  distanceToOtherCountries: DistanceToOtherCountries[];
  changed: boolean;
}

export interface DistanceToOtherCountries {
  countryName: string;
  distanceInKm: number;
}

export interface OfficialLanguages {
  nativeName: string;
}

export interface TopLevelDomains {
  name: string;
}

export interface Borders {
  name: string;
  location: {
    longitude: number;
    latitude: number;
  };
}
