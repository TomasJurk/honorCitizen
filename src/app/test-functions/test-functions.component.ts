import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { PostService } from '../posts/post.service';
import { AuthHttp } from 'angular2-jwt';
import { FileUploader, FileSelectDirective, FileUploaderOptions } from 'ng2-file-upload/ng2-file-upload';
import url from '../url';

@Component({
  selector: 'app-test-functions',
  templateUrl: './test-functions.component.html',
  styleUrls: ['./test-functions.component.scss']
})
export class TestFunctionsComponent implements OnInit {
  url = url;
  public uploader: FileUploader = new FileUploader({ url: `${url}/posts/post`, itemAlias: 'photo' });

  constructor(
    private _auth: AuthService,
    private _post: PostService,
    private http: AuthHttp) { }

  user: object;
  message: string;
  date: Date;
  filterBy: string = '';
  categoryFilter: string = 'dogs';
  category: string = 'dogs';
  postList: any[];
  size: any;
  allComments: any[];
  dateFrom: Date;
  dateTo: Date;

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    if (localStorage.user) {
      this.user = JSON.parse(localStorage.user);
    }
  }

  changePassword(newPassword) {
    this.http.put(`${url}/users/auth/changePassword`, { newPassword }).subscribe(a => console.log(a))
  }

  filter() {
    const query: any = {};
    query.sort = '-createdAt';
    query.categories = ['cats', 'dogs'];
    query.location = {
      longitude: 24,
      latitude: 55,
      distance: 100000
    };
    query.limit = 0;
    query.skip = 0;
    console.log(query);
    // this.http.post(`${url}/posts/filter/${value}`, query).subscribe(data => console.log(data.json()))
    this.http.post(`${url}/posts/filter`, query).subscribe(data => console.log(data.json()));
  }

  filterByUser() {
    const query: any = {};
    query.sort = '-createdAt';
    query.categories = ['mongoose'];
    query.location = {
      longitude: 24,
      latitude: 55,
      distance: 100000
    };
    query.limit = 0;
    query.skip = 0;
    console.log(query);
    this.http.post(`${url}/posts/filter/${this.user['_id']}`, query).subscribe(data => console.log(data.json()))
    // this.http.post(`${url}/posts/filter`, query).subscribe(data => console.log(data.json()));
  }

  deleteComment(id, postID, lastID, authorID) {
    this.http.post(`${url}/comments/${id}`, { postID, lastID, authorID }).subscribe(data => console.log(data.json()));
  }

  report(id) {
    console.log('reported');
    this.http.put(`${url}/posts/post/${id}`, { action: 'report' }).subscribe(data => console.log(data.json()));
  }

  like(id) {
    console.log('liked');
    this.http.put(`${url}/posts/post/${id}`, { action: 'like' }).subscribe(data => console.log(data.json()))
  }

  deletePost(id) {
    this._post.deletePost(id).subscribe(res => console.log(res));
  }

  logAllComments(id) {
    this._post.getAllComments(id).subscribe(data => {
      console.log(data.json());
      this.allComments = data.json();
    });
  }

  postComment(message, postID) {
    const userID = JSON.parse(localStorage.user)._id;
    const userPhoto = this.user['photoURL'];
    const username = this.user['fullName'];
    this._post.postComment({ message, postID, userID }).subscribe(res => console.log(res.json()));
  }

  newPost() {
    const desc = this.message;
    const category = this.category;
    const date = this.date;
    const id = JSON.parse(localStorage.user)._id;
    const options: FileUploaderOptions = {};
    const token = localStorage.id_token;
    options.headers = [{ name: 'x-auth-token', value: token }];
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('user', id);
      form.append('description', desc);
      form.append('latitude', 55.754940702479175);
      form.append('longitude', 24.34982299804688);
      form.append('createdAt', Date.now());
      form.append('category', category);
      form.append('date', date);
    };
    this.uploader.setOptions(options);
    this.uploader.uploadAll();
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log(JSON.parse(response));
    };
  }

  getOnePost(id) {
    this.http.get(`${url}/posts/post/${id}`).subscribe(post => {
      console.log(post.json())
    })
  }

  getPosts() {
    this._post.getAllPosts().subscribe(data => {
      this.postList = data.json();
      console.log(this.postList);
    });
  }

  emailLogin() {
    this._auth.emailLogin('email123@email.com', 'password');
  }

  fbLogin() {
    this._auth.fbLogin().then(response => console.log(response));
  }

  getCurrentUser() {
    this._auth.getCurrentUser()
      .then(d => console.log(d))
      .catch(err => console.log(err));
  }

  emailSignup() {
    const userData = {
      email: 'email123@email.com',
      name: 'Name',
      password: 'password',
    };
    this._auth.emailSignup(userData).subscribe(d => console.log(d));
  }

  logout() {
    this._auth.logout();
  }

  isLoggedIn() {
    console.log(this._auth.isLoggedIn());
  }


}
