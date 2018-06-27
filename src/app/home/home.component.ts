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

  fbLogin() {
    this._auth.fbLogin();
  }

  // get() {
  // 	this._auth.get().subscribe(data => console.log(data))
  // }

  // post() {
  // 	this._auth.post(this.user.email, this.user.password).subscribe(data => console.log(data));
  // }

}
