import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewUserModalComponent } from '../modals/new-user-modal/new-user-modal.component';
import { AuthService } from '../core/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private aS: AuthService
  ) { }

  ngOnInit() {
  }

  openDialog() {
    this.dialog.open(NewUserModalComponent, {
      data: {
        readme: 'something if needed'
      }
    });
  }

  signIn(email, password) {
    this.aS.emailLogIn(email, password);
    //
  }

}
