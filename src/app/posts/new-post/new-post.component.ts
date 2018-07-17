import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { PostService } from '../post.service';
import { FileUploader, FileSelectDirective, FileUploaderOptions } from 'ng2-file-upload/ng2-file-upload';
import url from '../../url';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({ url: `${url}/posts/post`, itemAlias: 'photo' });

  user: object;
  message: string;
  cordinates: {latitude: number, longitude: number};
  size: any;

  constructor(
    private _aS: AuthService,
    private _pS: PostService
  ) { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    if (localStorage.user) {
      this.user = JSON.parse(localStorage.user);
    }
  }

  getFileSize(file, el) {
    this.size = file.size;
    // svg neskaito gal darom tik jpg ir png ar kokius ten tik fotikai ir tel formatus palaiko
    // const onlyfiles = new RegExp(/([a-zA-Z0-9\s_\\.\-\(\):])+(.jpg|.png)$/i);
    // onlyfiles.test(file.name);
    if (file.type.split('/')[0] !== 'image') {
      el.value = null;
      console.log('incorrect file type');
    }
  }
  getCordinates(obj) {
    this.cordinates = obj;
  }
  newPost(el) {
    if (this.size >= 6000000) {
      console.log('too big');
      return;
    } else if (!el) {
      console.log('nothing to send');
      return;
    }
    const id = JSON.parse(localStorage.user)._id;
    if (id) {
      const options: FileUploaderOptions = {};
      const token = localStorage.id_token;
      options.headers = [{ name: 'x-auth-token', value: token }];
      this.uploader.onBuildItemForm = (item, form) => {
        form.append('user', id);
        form.append('description', this.message);
        form.append('longitude', this.cordinates.longitude);
        form.append('latitude', this.cordinates.latitude);
      };
      this.uploader.setOptions(options);
      this.uploader.uploadAll();
      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        console.log(JSON.parse(response));
      };
    } else {
      console.log('please login');
    }
  }

}
