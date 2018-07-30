import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditProfileModalComponent } from './edit-profile-modal/edit-profile-modal.component';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    public editProfileDialog: MatDialog,
    private _aS: AuthService
  ) { }

  ngOnInit() {
  }

  getUserPosts() {
    // 
  }

  editProfile() {
    this.editProfileDialog.open(EditProfileModalComponent, {
      data: {
        readme: 'something if needed'
      }
    });
  }

}
