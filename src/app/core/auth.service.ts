import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthHttp } from 'angular2-jwt';

declare const FB: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	usersURL: string = 'http://192.168.0.6:4200/users'

  constructor(
  	// private http: HttpClient,
  	private http: AuthHttp 
  	) {
  	FB.init({
  		appId: 233355730725067,
  		status: false,
  		cookie: false,
  		xfbml: false,
  		version: 'v2.8'
  	})
  }

  fbLogin() {
    return new Promise((resolve, reject) => {
      FB.login(result => {
        if (result.authResponse) {
          return this.http.post(`http://localhost:3000/api/v1/auth/facebook`, {access_token: result.authResponse.accessToken})
              .toPromise()
              .then(response => {
                var token = response.headers.get('x-auth-token');
                if (token) {
                  localStorage.setItem('id_token', token);
                }
                resolve(response.json());
              })
              .catch(() => reject());
        } else {
          reject();
        }
      }, {scope: 'public_profile,email'})
    });
  }

  logout() {
    localStorage.removeItem('id_token');
  }

  isLoggedIn() {
    return new Promise((resolve, reject) => {
      this.getCurrentUser().then(user => resolve(true)).catch(() => reject(false));
    });
  }

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      return this.http.get(`http://localhost:3000/api/v1/auth/me`).toPromise().then(response => {
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
