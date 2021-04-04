export interface AppConfig {
  name: string;
  production: boolean;
  apiCountry: {
    url: string;
  };
  apiCustom: {
    url: string;
  };
  authentication: {
    googleClientId: string;
  };
}
