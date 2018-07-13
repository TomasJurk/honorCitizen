import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import url from '../url'; // delete later

@Injectable({
  providedIn: 'root'
})

export class PostService {
  protected url = url; // change to IP later
  constructor(
    private http: AuthHttp
  ) { }

  createNewPost() {
    return this.http.post(`${this.url}/posts/post`, {} );
  }

  getAllPosts() {
    return this.http.get(`${this.url}/posts/post`);
  }

  postComment(body: any) {
    return this.http.post(`${this.url}/comments/post`, body);
  }

  getAllComments(postid: string) {
    return this.http.get(`${this.url}/comments/all/` + postid);
  }

  deletePost(postid: string) {
    return this.http.delete(`${this.url}/posts/post/` + postid);
  }

}
