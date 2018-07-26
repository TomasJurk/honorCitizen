import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { PostService } from '../../posts/post.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.scss']
})
export class PostModalComponent implements OnInit {

  currentUser: string;
  postLiked: boolean;
  allLikes: any;
  comments: any;
  lastCommentId: string;
  writeComment: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PostModalComponent>,
    private _pS: PostService,
    private _aS: AuthService
  ) { }


  ngOnInit() {
    this.currentUser = this._aS.user._id;
    this.getSinglePostData();
    this.getComments(this.data.id);
  }

  closeModal() {
    this.dialogRef.close('Closed');
  }

  getSinglePostData() {
    this._pS.getOnePost(this.data.id).subscribe(data => {
      console.log(data.json());
      this.allLikes = data.json().likes;
      this.postLiked = this.allLikes.users.includes(this.currentUser);
      console.log(this.postLiked);
    });
  }

  like(id) {
    this._pS.postLike(id).subscribe(data => {
      console.log(data.json());
      this.allLikes = data.json().data.likes;
      this.postLiked = this.allLikes.users.includes(this.currentUser);
    });
  }

  getComments(id) {
    this._pS.getAllComments(id).subscribe(data => {
      console.log(data.json());
      this.comments = data.json();
      if (data.json().length > 0) {
        this.lastCommentId = this.comments[this.comments.length - 1]._id;
      }
    });
  }

  postComment(message) {
    console.log(message);
    const postID = this.data.id;
    const user = JSON.parse(localStorage.user);
    const userID = user._id;
    this._pS.postComment({message, postID, userID}).subscribe(res => {
      console.log(res);
      this.getComments(this.data.id);
      this.writeComment = '';
    });
  }

  deleteComment(id, postID, lastID, authorID) {
    this._pS.deleteComment(id, postID, lastID, authorID).subscribe(data => {
      console.log(data.json());
      this.getComments(this.data.id);
    });
  }

}
