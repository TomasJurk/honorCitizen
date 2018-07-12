import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { PostService } from '../core/post.service';
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
  size: any;

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    if (localStorage.user) {
      this.user = JSON.parse(localStorage.user)
    }
  }

  deletePost(id) {
    this._post.deletePost(id).subscribe(res => console.log(res));
  }

  logAllComments(id) {
    this._post.getAllComments(id).subscribe(data => console.log(data.json()))
  }

  postComment(message, postID) {
    const userID = JSON.parse(localStorage.user)._id;
    const userPhoto = this.user['photoURL'];
    const username = this.user['fullName'];
    this._post.postComment(message, postID, userID).subscribe(res => console.log(res))
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
    }
    this.uploader.setOptions(options);
    this.uploader.uploadAll();
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log(JSON.parse(response));
    };
  }

  getPosts() {
    this._post.getAllPosts().subscribe(data => {
      this.postList = data.json();
      console.log(this.postList)
    });
  }

  emailLogin() {
    this._auth.emailLogin('email123@email.com', 'password');
  }

  emailSignup() {
    this._auth.emailSignup('Name', 'email123@email.com', 'password', 'photourl...').subscribe(d => console.log(d));
  }

  fbLogin() {
    this._auth.fbLogin().then(() => {
      this._auth.getCurrentUser().then(data => {
        localStorage.setItem('user', JSON.stringify(data));
        this.user = JSON.parse(localStorage.user);
      })
    }).catch(err => console.log(err))
  }

  logout() {
    this._auth.logOut();
  }

  isLoggedIn() {
    this._auth.isLoggedIn()
      .then(d => console.log(d))
      .catch(err => console.log(err));
  }

  getCurrentUser() {
    this._auth.getCurrentUser()
      .then(d => console.log(d))
      .catch(err => console.log(err));
  }


}
