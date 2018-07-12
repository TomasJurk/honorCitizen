import { Component, OnInit } from '@angular/core';
import { PostService } from './post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {


  postList: any[];

  constructor(
    private _pS: PostService
  ) { }

  ngOnInit() {
    this.getPosts();
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
