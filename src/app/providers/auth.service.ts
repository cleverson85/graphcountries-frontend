import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { ToasterService } from './common/toaster.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SocialAuthService } from "angularx-social-login";

import { GoogleLoginProvider } from "angularx-social-login";

import { ExternalAuth } from '../models/externalauth';
import { Environment } from '../environment.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API = Environment.settings.apiCustom.url;

  mostrarMenuEmitter = new EventEmitter<boolean>();
  tokenHelper = new JwtHelperService();

  get token () {
    return localStorage.getItem('token')
  }

  constructor(private httpClient: HttpClient,
              private router: Router,
              private toaster: ToasterService,
              private externalAuthService: SocialAuthService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    })
  };

  login(usuario: Usuario) {
    this.httpClient.post(`${this.API}session`, JSON.stringify(usuario), this.httpOptions)
      .subscribe((result: any) => {
        this.configureSession(result);
      },
      (e: HttpErrorResponse) => {
        const { error } = e;
        this.toaster.showToastError(error.message);
      });
  }

  loginExternal(externalAuth: ExternalAuth) {
    this.httpClient.post(`${this.API}api/auth/ExternalLogin`, externalAuth)
      .subscribe((result: any) => {
        this.configureSession(result);
      },
      (e: HttpErrorResponse) => {
        const { error } = e;
        this.toaster.showToastError(error.message);
      });
  }

  logOut() {
    const { email } = this.tokenHelper.decodeToken(localStorage.getItem('token'));
    localStorage.removeItem('token');
    this.mostrarMenuEmitter.emit(false);
    this.router.navigate(['']);
  }


  configureSession(result: any) {
    debugger;
    const { token, autenticado } = result;

    if (autenticado) {
      localStorage.setItem('token', token);
      this.router.navigate(['/home']);
    } else {
      this.mostrarMenuEmitter.emit(false);
      this.router.navigate(['']);
    }
  }

  usuarioAutenticado() {
    const isExpired = this.tokenHelper.isTokenExpired(localStorage.getItem('token'));
    this.mostrarMenuEmitter.emit(!isExpired);

    return isExpired;
  }

  signInWithGoogle() {
    return this.externalAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOutExternal() {
    this.externalAuthService.signOut();
  }
}
