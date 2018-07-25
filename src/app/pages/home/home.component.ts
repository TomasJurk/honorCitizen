import { Component, OnInit } from '@angular/core';
import { PostService } from '../../posts/post.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts: any;
  constructor(private _pS: PostService) {
    this.getPosts();

  }

  ngOnInit() {
   }


   getPosts() {
    this._pS.filter('-createdAt', null, null, 8, 0).subscribe(
      data => {
      this.posts = data.json();
    },
    error => console.log(error),
    () => console.log(this.posts)
  );
  }
}
