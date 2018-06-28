import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _auth: AuthService) {}

  user: object = {
  	email: '',
  	password: ''
  };

  ngOnInit() {
  }

  emailSignup() {
    this._auth.emailSignup().subscribe(d => console.log(d.json()));
  }

  fbLogin() {
    this._auth.fbLogin();
  }

  logout() {
  	this._auth.logout();
  }

  isLoggedIn() {
  	this._auth.isLoggedIn().then(d => console.log(d));
  }

  getCurrentUser() {
  	this._auth.getCurrentUser().then(d => console.log(d));
  }

  // get() {
  // 	this._auth.get().subscribe(data => console.log(data))
  // }

  // post() {
  // 	this._auth.post(this.user.email, this.user.password).subscribe(data => console.log(data));
  // }

}
