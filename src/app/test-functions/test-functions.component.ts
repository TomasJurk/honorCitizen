import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { PostService } from '../posts/post.service';
import { FileUploader, FileSelectDirective, FileUploaderOptions } from 'ng2-file-upload/ng2-file-upload';
import { AuthHttp } from 'angular2-jwt';
import url from '../url';

@Component({
  selector: 'app-test-functions',
  templateUrl: './test-functions.component.html',
  styleUrls: ['./test-functions.component.scss']
})
export class TestFunctionsComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({ url: `${url}/posts/post`, itemAlias: 'photo' });

  constructor(private _auth: AuthService,
    private _post: PostService) { }

  user: object;
  message: string;
  postList: any[];

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.user = this._auth.getCurrentUser();
  }

  deletePost(id) {
    this._post.deletePost(id).subscribe(res => console.log(res));
  }

  logAllComments(id) {
    this._post.getAllComments(id).subscribe(data => console.log(data.json()));
  }

  postComment(message, postID) {
    const userID = JSON.parse(localStorage.user)._id;
    const userPhoto = this.user['photoURL'];
    const username = this.user['fullName'];
    this._post.postComment({
      message: message,
      userPhoto: userPhoto,
      username: username,
      postID: postID,
      userID: userID
    }).subscribe(res => console.log(res));
  }

  newPost() {
    const desc = this.message;
    const id = JSON.parse(localStorage.user)._id;
    const options: FileUploaderOptions = {};
    const token = localStorage.id_token;
    options.headers = [{ name: 'x-auth-token', value: token }];
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('user', id);
      form.append('description', desc);
    };
    this.uploader.setOptions(options);
    this.uploader.uploadAll();
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log(JSON.parse(response));
    };
  }

  getPosts() {
    this._post.getAllPosts().subscribe(data => {
      this.postList = data.json();
      console.log(this.postList);
    });
  }

  emailLogin() {
    this._auth.emailLogin('email123@email.com', 'password').subscribe(
      response => {
        console.log(response);
        const token = response.headers.get('x-auth-token');
        if (token) {
          localStorage.setItem('id_token', token);
          }
        },
          error => console.log(error),
          () => console.log(this._auth.getCurrentUser())
      );
  }

  emailSignup() {
    const userData = {
      email: 'email123@email.com',
      fullName: 'Name',
      photoURL:  '',
      password: 'password',
    };
    this._auth.emailSignup(userData).subscribe(d => console.log(d.json()));
  }

  fbLogin() {
    this._auth.fbLogin().then(
      () => {
      this._auth.getCurrentUser();
      }).catch(err => console.log(err));
  }

  logout() {
    this._auth.logout();
  }

  isLoggedIn() {
    console.log(this._auth.isLoggedIn());
  }

  getCurrentUser() {
    console.log(this._auth.getCurrentUser());
  }


}
