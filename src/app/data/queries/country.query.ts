import gql from 'graphql-tag';

export class CountryQuery {

  static queryCountryByName() {
    return gql`
    query Country($name: String) {
      Country (name: $name, orderBy: _id_asc) {
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
      Country (capital: $capitalName, orderBy: _id_asc) {
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
		query Country($itens: Int, $offset: Int) {
      Country (first: $itens, offset: $offset, orderBy: _id_asc) {
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
