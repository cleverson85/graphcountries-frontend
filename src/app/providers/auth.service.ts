import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { ToasterService } from './common/toaster.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

import { Token } from './../shared/token.enum';
import { ApiRoute } from './../shared/apiRoutes.enum';
import { Usuario } from 'src/app/models/usuario';
import { ExternalAuth } from '../models/externalauth';

import { Environment } from '../environment.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API = Environment.settings.apiCustom.url;

  mostrarMenuEmitter = new EventEmitter<boolean>();
  tokenHelper = new JwtHelperService();
  tempUser = false;

  constructor(private httpClient: HttpClient,
              private router: Router,
              private toaster: ToasterService,
              private externalAuthService: SocialAuthService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    })
  };

  login(user: Usuario) {
    this.configureToken(ApiRoute.TEPORALY_AUTH, user);
  }

  loginExternal(externalAuth: ExternalAuth) {
    this.configureToken(ApiRoute.EXTERNAL_AUTH, externalAuth);
  }

  configureToken(endPoint: ApiRoute, credencials: any) {
    this.httpClient.post(`${this.API}${endPoint}`, credencials)
    .subscribe((result: any) => {
      this.configureSession(result);
    },
    (e: HttpErrorResponse) => {
      const { error } = e;
      this.toaster.showToastError(error.message);
    });
  }

  logOut() {
    if (!this.tempUser) {
      this.signOutExternal();
    }

    this.removeToken();
    this.mostrarMenuEmitter.emit(false);
    this.router.navigate(['']);
  }

  removeToken() {
    localStorage.removeItem(Token.Key);
  }

  setToken(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getToken(key: string): string {
    return localStorage.getItem(key)
  }

  configureSession(result: any) {
    const { token, isAuthenticaded, tempUser } = result;
    this.tempUser = tempUser;

    if (isAuthenticaded) {
      this.setToken(Token.Key, token);
      this.router.navigate(['/home']);
    } else {
      this.mostrarMenuEmitter.emit(false);
      this.router.navigate(['']);
    }
  }

  tokenIsExpired(): boolean {
    const isExpired = this.tokenHelper.isTokenExpired(this.getToken(Token.Key));
    this.mostrarMenuEmitter.emit(!isExpired);

    return isExpired;
  }

  signInWithGoogle(): any {
    return this.externalAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOutExternal() {
    this.externalAuthService.signOut();
  }
}
