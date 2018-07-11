import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  protected url = 'http://176.223.143.125:3000/api/';
  private token: string;
  public user;

  constructor( private http: HttpClient) {
    this.user = this.getLocalStorageUser();
  }

  emailSignUp(user) {
    const userData = {
      email: user.email,
      fullName: user.name,
      photoURL: user.photoURL,
      password: user.password,
    };
    return this.http.post(this.url + 'auth/emailSignup', userData);
  }

  emailLogIn(email, password) {
    const userData = {
      email: email,
      password: password
    };
    this.http.post(this.url + 'auth/login', userData, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json'),
      observe: 'response'
    }).subscribe( res => {
      this.token = res.headers.get('x-auth-token');
      return this.currentUser();
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
