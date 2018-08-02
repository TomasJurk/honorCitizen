import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditProfileModalComponent } from './edit-profile-modal/edit-profile-modal.component';
import { AuthService } from '../core/auth.service';
import { PostService } from '../posts/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser: any;
  userPosts: any = [];

  constructor(
    public editProfileDialog: MatDialog,
    private _aS: AuthService,
    private _pS: PostService
  ) { }

  ngOnInit() {
    this.currentUser = this._aS.user;
    this.getUserPosts();
  }
  
  editProfile() {
    this.editProfileDialog.open(EditProfileModalComponent, {
      data: {
        currentUser: this.currentUser
      }
    });
  }
  
  getUserPosts() {
    this._pS.getAllPosts().subscribe(posts => {
      const allPosts = posts.json();
      allPosts.map(post => {
        if (post.user.id === this.currentUser._id) {
          this.userPosts.push(post);
        }
      });
      console.log(this.userPosts);
    });
  }


}
