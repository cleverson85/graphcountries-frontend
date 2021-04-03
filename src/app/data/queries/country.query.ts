import gql from 'graphql-tag';

export class CountryQuery {

  static queryCountryByName() {
    return gql`
    query Country($name: String) {
      Country (filter: { name_contains: $name }) {
        _id
        flag {
          svgFile
        }
        name
        capital
        area
        population
      }
    }`;
  }

  static queryCountryById() {
    return gql`
		query Country($id: String!) {
      Country (_id: $id) {
        _id
        flag {
          svgFile
        }
        name
        capital
        area
        population
        populationDensity
    		officialLanguages {
          nativeName
        }
    		topLevelDomains (first: 5) {
          name
        }
    		borders (first: 5) {
          name
          location {
            x
            y
            longitude
            latitude
          }
        }
        distanceToOtherCountries (first: 5) {
          countryName
          distanceInKm
        }
      }
    }`;
  }

  static queryCountryByCapitalName() {
    return gql`
		query Country($capitalName: String) {
      Country (filter: { capital_contains: $capitalName }) {
        _id
        flag {
          svgFile
        }
        name
        capital
        area
        population
      }
    }`;
  }

  static queryCountryPage() {
    return gql`
		query Country($page: Int) {
      Country (first: 9, offset: $page) {
        _id
        flag {
          svgFile
        }
        name
        capital
        area
        population
      }
    }`;
  }

  static queryCount() {
    return gql`
		query Country {
      Country {
        _id
      }
    }`;
  }
}
