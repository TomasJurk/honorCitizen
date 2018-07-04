import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { PostService } from '../core/post.service';
import { FileUploader, FileSelectDirective, FileUploaderOptions } from 'ng2-file-upload/ng2-file-upload';
import { AuthHttp } from 'angular2-jwt';

const URL = 'http://localhost:3000/posts/post';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

  constructor(private _auth: AuthService,
    private _post: PostService) { }

  user: object = JSON.parse(localStorage.user);

  postList: any[];

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
  }

  postComment(message, postID) {
    let userID = JSON.parse(localStorage.user)._id;
    let userPhoto = this.user['photoURL'];
    let username =this.user['fullName'];
    this._post.postComment({
      message: message,
      userPhoto: userPhoto,
      username: username,
      postID: postID, 
      userID: userID
    })
      .subscribe(res => console.log(res))
  }

  newPost() {
    let desc = 'This is an image';
    let id = JSON.parse(localStorage.user)._id;
    // this._post.createNewPost()
    //   .subscribe(res => console.log(res));
    let options: FileUploaderOptions = {};
    let token = localStorage.id_token;
    options.headers = [{name: 'x-auth-token', value: token}];
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('user', id);
      form.append('description', desc);
    }
    this.uploader.setOptions(options);
    this.uploader.uploadAll();
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
    };
  }

  getPosts() {
    this._post.getAllPosts().subscribe(data => {
      this.postList = data.json();
      console.log(this.postList)
    });
  }

  emailLogin() {
    this._auth.emailLogin().subscribe(response => {
      let token = response.headers.get('x-auth-token');
      if (token) {
        localStorage.setItem('id_token', token);
        this._auth.getCurrentUser().then(data => {
          localStorage.setItem('user', JSON.stringify(data))
        })
      }
    });
  }

  emailSignup() {
    this._auth.emailSignup().subscribe(d => console.log(d));
  }

  logoutEmail() {
    this._auth.logoutEmail().subscribe(d => console.log(d));
  }

  fbLogin() {
    this._auth.fbLogin();
  }

  logout() {
    this._auth.logout();
  }

  isLoggedIn() {
    this._auth.isLoggedIn().then(d => console.log(d));
  }

  getCurrentUser() {
    this._auth.getCurrentUser().then(d => console.log(d));
  }


}
