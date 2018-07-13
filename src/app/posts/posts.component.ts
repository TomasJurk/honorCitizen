import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PostService } from './post.service';
import { PostModalComponent } from './post-modal/post-modal.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  postList: any[];

  constructor(
    private _pS: PostService,
    public postModal: MatDialog
  ) { }

  ngOnInit() {
    this.getPosts();
  }

  openPostDialog(post) {
    this.postModal.open(PostModalComponent, {
      data: {
        id: post._id,
        name: post.user.fullName,
        descr: post.description,
        img: post.image
      }
    });
  }

  getPosts() {
    this._pS.getAllPosts().subscribe(
      data => {
      this.postList = data.json();
    },
    error => console.log(error),
    () => console.log(this.postList)
  );
  }

}
