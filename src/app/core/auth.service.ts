import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import url from '../url'; // delete later
declare const FB: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  protected url = url; // change to IP later
  public user;

  constructor(
    private http: AuthHttp
  ) {
    FB.init({
      appId: 233355730725067,
      status: false,
      cookie: false,
      xfbml: false,
      version: 'v3.0'
    });
    if (localStorage.user) {
      this.user = JSON.parse(localStorage.user);
    }
  }

  emailSignup(user) {
    const userData = {
      email: user.email,
      fullName: user.name,
      photoURL: user.photoURL,
      password: user.password,
    };
    return this.http.post(this.url + '/users/auth/emailSignup', userData);
  }

  emailLogin(email: string, password: string) {
    return this.http.post(this.url + '/users/auth/login',
      { email, password }).subscribe(
        response => {
        	console.log(response);
          const token = response.headers.get('x-auth-token');
          if (token) {
            localStorage.setItem('id_token', token);
            this.getCurrentUser().then(data => {
              localStorage.setItem('user', JSON.stringify(data));
              this.user = JSON.parse(localStorage.user);
            });
          }
        },
        error => console.log(error),
    );
  }


  fbLogin() {
    return new Promise((resolve, reject) => {
      FB.login(result => {
        if (result.authResponse) {
          const token = result.authResponse.accessToken;
          return this.http.post(`${this.url}/users/auth/facebook`, { access_token: token })
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
    }).then(() => {
      this.getCurrentUser().then(data => {
        localStorage.setItem('user', JSON.stringify(data));
        this.user = JSON.parse(localStorage.user);
      });
    }).catch(err => console.log(err));
  }

  logout() {
    if (!localStorage.id_token) {
      console.log('No active users');
      return;
    }
    this.user = '';
    delete localStorage.user;
    delete localStorage.id_token;
  }

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      return this.http.get(`${this.url}/users/auth/me`).toPromise().then(response => {
        resolve(response.json());
      }).catch(() => reject());
    });
  }

  isLoggedIn() {
    return this.user ? true : false; // !!this.user;
  }
}
