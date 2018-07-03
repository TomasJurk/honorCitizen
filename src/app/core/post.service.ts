import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { AuthHttp } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
  	private http: AuthHttp
  ) { }

  createNewPost(file) {
  	return this.http.post('http://localhost:3000/posts/test',{},file)
  }

  getAllPosts() {
  	return this.http.get('http://localhost:3000/posts/post')
  }
}
