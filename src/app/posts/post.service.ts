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

  getOnePost(id) {
    return this.http.get(`${this.url}/posts/post/${id}`);
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

  postLike(id) {
    return this.http.put(`${this.url}/posts/post/${id}`, { action: 'like' });
  }

  getAllComments(postid: string) {
    return this.http.get(`${this.url}/comments/all/` + postid);
  }

  postComment(body: any) {
    return this.http.post(`${this.url}/comments/post`, body);
  }

  deleteComment(id, postID, lastID, authorID) {
    return this.http.post(`${this.url}/comments/${id}`, { postID, lastID, authorID });
  }

  deletePost(postid: string) {
    return this.http.delete(`${this.url}/posts/post/` + postid);
  }

}
