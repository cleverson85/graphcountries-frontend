export enum ApiRoute {
  EXTERNAL_AUTH = 'api/auth/ExternalLogin',
  LOGIN = 'api/auth/Login',
  POST = 'api/countries/Save',
  GETALL = 'api/countries/GetAll',
  PUT = 'api/countries/Update',
  DELETE = 'api/countries/Delete/',
  GIT_REPOSITORY = 'api/countries/GetUrlRepository',
  GETBY_ID = 'api/countries/GetById/',
  GETBY_CAPITAL_NAME = 'api/countries/GetByCapitalName/',
  GETBY_COUNTRY_NAME = 'api/countries/GetByCountryName/',
  GET_PAGED = 'api/countries/GetWithPages',
  GET_COUNT = 'api/countries/GetCount'
}
