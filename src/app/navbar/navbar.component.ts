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

  constructor(
    public newUserDialog: MatDialog,
    public loginDialog: MatDialog,
    private _aS: AuthService
  ) { }

  ngOnInit() {
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

  signIn(email, password) {
    this._aS.emailLogIn(email, password);
  }

}
