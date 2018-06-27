import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewUserModalComponent } from '../modals/new-user-modal/new-user-modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public dialog: MatDialog
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

  signIn() {
    //
  }

}
