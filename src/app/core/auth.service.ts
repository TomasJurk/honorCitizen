import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthHttp } from 'angular2-jwt';
import url from '../url';

declare const FB: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  protected url = 'http://176.223.143.125:3000/api/';
  private token: string;
  public user;

  constructor(
    private _http: AuthHttp,
    private http: HttpClient
  ) {
    FB.init({
      appId: 233355730725067,
      status: false,
      cookie: false,
      xfbml: false,
      version: 'v3.0'
    });
    this.user = this.getLocalStorageUser();
  }

// LUKO //
// <<<<<<<<<<<
  emailSignUp(user) {
    const userData = {
      email: user.email,
      fullName: user.name,
      photoURL: user.photoURL,
      password: user.password,
    };
    return this.http.post(this.url + 'auth/emailSignup', userData);
  }

  emailSignup(fullName: string, email: string, password: string, photoURL: string) {
    return this._http.post(`${url}/users/auth/emailSignup`,
      {
        fullName,
        email,
        password,
        photoURL
      })
  }

  emailLogin(email: string, password: string) {
    return this._http.post(`${url}/users/auth/login`, { email, password })
  }

  fbLogin() {
    return new Promise((resolve, reject) => {
      FB.login(result => {
        if (result.authResponse) {
          let token = result.authResponse.accessToken;
          return this._http.post(`${url}/users/auth/facebook`, { access_token: token })
            .toPromise()
            .then(response => {
              let token = response.headers.get('x-auth-token');
              if (token) {
                localStorage.setItem('id_token', token);
              }
              resolve(response.json());
            })
            .catch(() => reject());
        } else {
          reject();
        }
      }, { scope: 'public_profile,email' })
    });
  }

  logout() {
    if (localStorage.id_token) {
      localStorage.removeItem('id_token');
      localStorage.removeItem('user');
      console.log('logged out');
    } else {
      console.log('not logged in')
    }
  }

  isLoggedIn() {
    return new Promise((resolve, reject) => {
      this.getCurrentUser().then(user => resolve(true)).catch(() => reject(false));
    });
  }

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      return this._http.get(`${url}/users/auth/me`).toPromise().then(response => {
        resolve(response.json());
      }).catch(() => reject());
    });
  }

// >>>>>>>>>>>





  emailLogIn(email, password) {
    const userData = {
      email: email,
      password: password
    };
    this.http.post(this.url + 'auth/login', userData, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json'),
      observe: 'response'
    }).subscribe(res => {
      this.token = res.headers.get('x-auth-token')
      return this.currentUser()
    });
  }
  logOut() {
    // need backend function logout remove token from server
    this.token = null;
    this.user = null;
    delete window.localStorage.user;
  }
  currentUser() {
    return this.http.get(this.url + '/auth/me', {
      headers: new HttpHeaders()
        .set('x-auth-token', this.token)
    }).subscribe(res => {
      this.user = res;
      delete this.user.password;
      this.user.token = this.token;
      this.setLocalStorageUser();
    });
  }

  setLocalStorageUser() {
    if (!window.localStorage.user) {
      window.localStorage.user = JSON.stringify(this.user);
    }
  }

  getLocalStorageUser() {
    if (window.localStorage.user) {
      return JSON.parse(window.localStorage.user);
    }
  }
}
