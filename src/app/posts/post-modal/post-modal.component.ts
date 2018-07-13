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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PostModalComponent>,
    private _pS: PostService
  ) { }

  ngOnInit() {
    this.getComments(this.data.id);
  }

  getComments(id) {
    this._pS.getAllComments(id).subscribe(data => {
      console.log(data.json());
      this.comments = data.json();
    });
  }

}
