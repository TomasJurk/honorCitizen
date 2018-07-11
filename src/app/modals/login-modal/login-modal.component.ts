import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  constructor(
    private _aS: AuthService,
    private dialogRef: MatDialogRef<LoginModalComponent>
  ) { }

  ngOnInit() {
  }

  signIn(email, password) {
    this._aS.emailLogIn(email, password);
    // this.dialogRef.close();
  }

}
