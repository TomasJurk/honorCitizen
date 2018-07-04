import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
  	private http: AuthHttp
  ) { }

  createNewPost() {
  	return this.http.post('http://localhost:3000/posts/post',{})
  }

  getAllPosts() {
  	return this.http.get('http://localhost:3000/posts/post')
  }

  postComment(body: any) {
    return this.http.post('http://localhost:3000/comments/post', body)
  }

  getAllComments(postid: string) {
    return this.http.get('http://localhost:3000/comments/all/' + postid)
  }

}
