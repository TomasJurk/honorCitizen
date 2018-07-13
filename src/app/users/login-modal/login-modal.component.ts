import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { Headers } from '@angular/http';
@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  constructor(
    private _aS: AuthService,
    private router: Router,
    private dialogRef: MatDialogRef<LoginModalComponent>
  ) { }

  ngOnInit() {
  }

  signIn(email, password) {
    this._aS.emailLogin(email, password);
  }
}
