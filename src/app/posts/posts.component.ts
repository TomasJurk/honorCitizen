import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PostService } from './post.service';
import { PostModalComponent } from './post-modal/post-modal.component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  postList: any[];
  fromDate: any;
  toDate: any = new Date();
  categories: string[] = [];
  postID: any;
  constructor(
    private _pS: PostService,
    private aR: ActivatedRoute,
    public postModal: MatDialog
  ) { }

  ngOnInit() {
    this.getPosts();
    this.postID = this.aR.snapshot.params['id'];

  }

  openPostDialog(post) {
    console.log(post);
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
    () => {
      console.log('Done');
      // hard code laikinai
      if (this.postID) {
        this.getPost(this.postID);
      }
    }
  );
  }

  getPost(id) {
    console.log(id);
      this.openPostDialog(this.postList[0]);
  }

  formatRange(value: number | null) {
    if (value >= 10) {
      return Math.round(value) + 'KM';
    }
    return null;
  }
}
