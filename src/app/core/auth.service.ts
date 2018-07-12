import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

declare const FB: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  protected url = 'http://176.223.143.125:3000/';
  public user;

  constructor(
    // private _http: AuthHttp,
    private http: AuthHttp
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

  emailSignup(user) {
    const userData = {
      email: user.email,
      fullName: user.name,
      photoURL: user.photoURL,
      password: user.password,
    };
    return this.http.post(this.url + 'users/auth/emailSignup', userData);
  }

  emailLogin(email: string, password: string) {
    return this.http.post(this.url + 'users/auth/login',
      {email: email, password: password});
      // { observe: 'response' }
  }

  fbLogin() {
    return new Promise((resolve, reject) => {
      FB.login(result => {
        if (result.authResponse) {
          const token = result.authResponse.accessToken;
          return this.http.post(`${this.url}users/auth/facebook`, { access_token: token })
            .toPromise()
            .then(response => {
              const tok = response.headers.get('x-auth-token');
              if (tok) {
                localStorage.setItem('id_token', tok);
              }
              resolve(response.json());
            })
            .catch(() => reject());
        } else {
          reject();
        }
      }, { scope: 'public_profile,email' });
    });
  }

  logout() {
    if (!localStorage.id_token) {
      console.log('No active users');
      return;
    }
    // need backend function logout remove token from server
    this.user = '';
    delete localStorage.user;
    delete localStorage.id_token;
  }

  getCurrentUser() {

    if (window.localStorage.user) {
      this.user = JSON.parse(window.localStorage.user);
      return this.user;
    }

    this.http.get(this.url + 'users/auth/me').subscribe(
      data => {
        this.user = data.json();
      },
      error => console.log(error.statusText),
      () => {
        localStorage.setItem('user', JSON.stringify(this.user));
        return this.user;
      }
    );
  }

  isLoggedIn() {
    return this.user ? true : false;
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
