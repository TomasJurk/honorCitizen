import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})

export class PostService {
  protected url = 'http://176.223.143.125:3000';
  constructor(
    private http: AuthHttp
  ) { }

  createNewPost() {
    return this.http.post(`${this.url}/posts/post`, {} );
  }

  getAllPosts() {
    return this.http.get(`${this.url}/posts/post`);
  }
  filter(sort, filter, value, limit, skip) {
    const query: any = {
      sort,
      filter,
      value,
      limit,
      skip
    };
    if (!query.filter) {
      query.value = '';
    }
    return this.http.post(`${this.url}/posts/filter`, query);
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
