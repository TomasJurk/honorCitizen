import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { PostService } from '../core/post.service';
=======
import { PostService } from './post.service';
>>>>>>> 840cda56b3240e2386aab837d39df268035fe4d7

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

<<<<<<< HEAD
=======

>>>>>>> 840cda56b3240e2386aab837d39df268035fe4d7
  postList: any[];

  constructor(
    private _pS: PostService
  ) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
<<<<<<< HEAD
    this._pS.getAllPosts().subscribe(data => {
      this.postList = data.json();
      console.log(this.postList);
    });
=======
    this._pS.getAllPosts().subscribe(
      data => {
      this.postList = data.json();
    },
    error => console.log(error),
    () => console.log(this.postList)
  );
>>>>>>> 840cda56b3240e2386aab837d39df268035fe4d7
  }

}
