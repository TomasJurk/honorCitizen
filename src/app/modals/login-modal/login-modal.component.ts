import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  constructor(
    private _aS: AuthService
  ) { }

  ngOnInit() {
  }

  signIn(email, password) {
    this._aS.emailLogIn(email, password);
  }

}
