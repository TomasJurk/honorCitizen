import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { PostService } from '../../posts/post.service';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.scss']
})
export class PostModalComponent implements OnInit {

  comments: any;
  writeComment: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PostModalComponent>,
    private _pS: PostService
  ) { }

  ngOnInit() {
    this.getComments(this.data.id);
  }

  closeModal() {
    this.dialogRef.close('Closed');
  }

  getComments(id) {
    this._pS.getAllComments(id).subscribe(data => {
      console.log(data.json());
      this.comments = data.json();
    });
  }

  postComment(message) {
    console.log(message);
    const postID = this.data.id;
    const user = JSON.parse(localStorage.user);
    const userID = user._id;
    const userPhoto = user['photoURL'];
    const username = user['fullName'];
    this._pS.postComment({message, postID, userID}).subscribe(res => {
      console.log(res);
      this.getComments(this.data.id);
    });
  }

}
