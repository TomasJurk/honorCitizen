import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewUserModalComponent } from '../../users/new-user-modal/new-user-modal.component';
import { LoginModalComponent } from '../../users/login-modal/login-modal.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user;
  constructor(
    public newUserDialog: MatDialog,
    public loginDialog: MatDialog,
    private _aS: AuthService
  ) {
    loginDialog.afterAllClosed
      .subscribe(() => {
        this.getUser();
      });
      newUserDialog.afterAllClosed
      .subscribe(() => {
        console.log('Welcome:)');
      });

  }

  ngOnInit() {
    this.getUser();
    if (this.user && this._aS.isExpired()) {
      this.openLoginDialog();
    }
  }

  openNewUserDialog() {
    this.newUserDialog.open(NewUserModalComponent, {
      data: {
        readme: 'something if needed'
      }
    });
  }

  openLoginDialog() {
    this.loginDialog.open(LoginModalComponent, {
      data: {
        readme: 'something if needed'
      }
    });
  }

  // signIn(email, password) {
  //   this._aS.emailLogin(email, password);
  // }
  logOut() {
    this._aS.logout();
    this.getUser();
  }
  getUser() {
    if (window.localStorage.user) {
      this.user = JSON.parse(window.localStorage.user);
      return;
    }
    this.user = null;
  }

}
