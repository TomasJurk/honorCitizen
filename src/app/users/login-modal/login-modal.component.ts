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
    const asd = this._aS.emailLogin(email, password, (data) => {
      console.log(data);
      if (data) {
        this.dialogRef.close();
      }
    });
  }

  fbLogin() {
    this._aS.fbLogin().then(response => {
      console.log(response);
      this.dialogRef.close('');
    });
  }
}
