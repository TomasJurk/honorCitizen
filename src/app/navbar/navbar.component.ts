import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewUserModalComponent } from '../modals/new-user-modal/new-user-modal.component';
import { LoginModalComponent } from '../modals/login-modal/login-modal.component';
import { AuthService } from '../core/auth.service';
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

  }

  ngOnInit() {
    this.getUser();
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

  logOut() {
    this.user = null;
    this._aS.logOut();
  }
  getUser() {
    if (window.localStorage.user) {
      this.user = JSON.parse(window.localStorage.user);
    }
  }

}
