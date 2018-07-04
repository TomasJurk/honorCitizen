import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthHttp } from 'angular2-jwt';

declare const FB: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // usersURL: string = 'http://192.168.0.6:4200/users'

  constructor(
    // private http: HttpClient,
    private http: AuthHttp
  ) {
    FB.init({
      appId: 233355730725067,
      status: false,
      cookie: false,
      xfbml: false,
      version: 'v3.0'
    })
  }

  emailSignup() {
    return this.http.post('http://localhost:3000/api/auth/emailSignup', 
      {
        fullName: 'John Smith', 
        email: 'email@email.com', 
        password: 'password', 
        photoURL: 'https://npengage.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'
      })
  }

  emailLogin() {
    return this.http.post('http://localhost:3000/api/auth/login', {email: 'email@email.com', password: 'password'})
  }

  logoutEmail() {
    return this.http.get('http://localhost:3000/api/auth/logout')
  }

  fbLogin() {
    return new Promise((resolve, reject) => {
      FB.login(result => {
        if (result.authResponse) {
          let token = result.authResponse.accessToken;
          // FB.api('/me', {fields: ['first_name', 'last_name']}, (response) => {
            // console.log(response);
            return this.http.post(`http://localhost:3000/api/auth/facebook`, { access_token: token })
              .toPromise()
              .then(response => {
                var token = response.headers.get('x-auth-token');
                if (token) {
                  localStorage.setItem('id_token', token);
                }
                resolve(response.json());
              })
              .catch(() => reject());
          // });
        } else {
          reject();
        }
      }, { scope: 'public_profile,email' })
    });
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('user');
  }

  isLoggedIn() {
    return new Promise((resolve, reject) => {
      this.getCurrentUser().then(user => resolve(true)).catch(() => reject(false));
    });
  }

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      return this.http.get(`http://localhost:3000/api/auth/me`).toPromise().then(response => {
        resolve(response.json());
      }).catch(() => reject());
    });
  }

  // get() {
  // 	return this.http.get(this.usersURL);
  // }

  // post(email: string, password: string) {
  // // console.log({ email, password });
  // 	return this.http.post(this.usersURL, {email, password});
  // }


}
