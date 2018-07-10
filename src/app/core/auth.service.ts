import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  protected url = 'http://176.223.143.125:3000/api/';

  constructor( private http: HttpClient) { }

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
    console.log(userData);
    return this.http.post(this.url + 'auth/login', userData).subscribe(res => console.log(res));
  }
}
