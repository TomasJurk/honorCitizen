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
    this._aS.emailLogin(email, password).subscribe(response => {
      // sutvarkyt response kad ivedus blogus duomenis ismestu error
      if (response.json().status === 401) {
        alert('Blogas prisijungimas');
        return;
      }
      const token = response.headers.get('x-auth-token');
      if (token) {
        localStorage.setItem('id_token', token);
      }
      this.dialogRef.close();
      },
        error => console.log(error),
        () => {
          this._aS.getCurrentUser();
        }
    );
  }

}
