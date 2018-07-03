import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { PostService } from '../core/post.service';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

  constructor(private _auth: AuthService,
    private _post: PostService) { }

  user: object = {
    email: '',
    password: ''
  };

  file;

  ngOnInit() {
  }

  storeFile(e) {
    this.file = e
  }

  newPost() {
    console.log(this.file)
    let image = this.file;
    let desc = 'This is';
    let id = JSON.parse(localStorage.user)._id;
    this._post.createNewPost(this.file)
      .subscribe(res => console.log(res));
  }

  getPosts() {
    this._post.getAllPosts().subscribe(data => console.log(data.json()));
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

  // get() {
  // 	this._auth.get().subscribe(data => console.log(data))
  // }

  // post() {
  // 	this._auth.post(this.user.email, this.user.password).subscribe(data => console.log(data));
  // }

}
