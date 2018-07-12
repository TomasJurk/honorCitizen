import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import url from '../url';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: AuthHttp
  ) { }

  createNewPost() {
    return this.http.post(`${url}/posts/post`, {});
  }

  getAllPosts() {
    return this.http.get(`${url}/posts/post`);
  }

  postComment(user, message, postID) {
    return this.http.post(`${url}/comments/post`, {
      user,
      message,
      postID
    });
  }

  getAllComments(postid: string) {
    return this.http.get(`${url}/comments/all/` + postid);
  }

  deletePost(postid: string) {
    return this.http.delete(`${url}/posts/post/` + postid);
  }

}
