import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PostService } from './post.service';
import { PostModalComponent } from './post-modal/post-modal.component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  @ViewChild('acInput') city: any;

  postList: any[];
  fromDate: any;
  toDate: any = new Date();
  postID: any;
  autocomplete: any;
  categories: object[] = [
    {value: 'ket-0', viewValue: 'Kelių eismo taisyklių pažeidimai'},
    {value: 'viesosios-1', viewValue: 'Viešosios tvarkos pažeidimai'},
    {value: 'vagyste-2', viewValue: 'Vagystė'},
    {value: 'nusikaltimai-3', viewValue: 'Nusikaltimai prieš asmenį'},
    {value: 'kiti-4', viewValue: 'Kiti nusikaltimai'}
  ];
  filterParams = {
    sort: null,
    filter: null,
    value: null,
    limit: null,
    skip: null
  };
  constructor(
    private _pS: PostService,
    private aR: ActivatedRoute,
    public postModal: MatDialog
  ) { }

  ngOnInit() {
    this.aR.snapshot.params['filters'] ? this.getPostsByFilters() : this.getPosts();
    this.postID = this.aR.snapshot.params['id'];
    this.initAutoComplete();
  }
  initAutoComplete() {
    this.autocomplete = new google.maps.places.Autocomplete(this.city.nativeElement);

  }
  openPostDialog(post) {
    console.log(post);
    this.postModal.open(PostModalComponent, {
      data: {
        id: post._id,
        name: post.user.fullName,
        descr: post.description,
        img: post.image
      }
    });
  }

  getPostsByFilters() {
    console.log(this.filterParams);
    const filters = this.aR.snapshot.params['filters'];
    //  params sort, filter, value, limit, skip
    // sort
    if (filters) {
    const params = filters.split(',');
     if (params[0] === 'dsc') {
      this.filterParams.sort = 'createdAt';
     } else if (params[0] === 'asc') {
      this.filterParams.sort = '-createdAt ';
     } else if (params[0] === 'com') {
      this.filterParams.sort = '-commentCount';
     } else if (params[0] === 'lik') {
      this.filterParams.sort = '-likes.count';
     }
     if (params[1] === 'loc') {
       const locationParams = params[2].split('&');
       this.filterParams.filter = 'location';
       this.filterParams.value = {
         latitude: locationParams[0],
         longitude: locationParams[1],
         distance: locationParams[0]
       };
     } else if (params[1] === 'usr') {
      this.filterParams.filter = 'user';
      this.filterParams.value = params[2];
     } else if (params[1] === 'cat') {
      this.filterParams.filter = 'category';
      this.filterParams.value = params[2];
     }
     if (params[3]) {
      this.filterParams.limit = params[3];
     }
     if (params[4]) {
      this.filterParams.skip = params[4];
    }
  }
     this._pS.filter(this.filterParams.sort,
                     this.filterParams.filter,
                     this.filterParams.value,
                     this.filterParams.limit,
                     this.filterParams.skip).subscribe(data => {
      this.postList = data.json();
    },
    error => console.log(error),
    () => console.log(this.postList)
  );
  }

  getPosts() {
    this._pS.getAllPosts().subscribe(
      data => {
      this.postList = data.json();
    },
    error => console.log(error),
    () => {
      console.log('Done');
      // hard code laikinai
      if (this.postID) {
        this.getPost(this.postID);
      }
    }
  );
  }

  getPost(id) {
    console.log(id);
      this.openPostDialog(this.postList[0]);
  }
  sendFilters(range, ) {
    console.log(range.value);
    const place = this.autocomplete.getPlace();
    if (place) {
      this.filterParams.filter = 'location';
      this.filterParams.value = {
        longitude: place.geometry.location.lng(),
        latitude: place.geometry.location.lat(),
        distance: range.value * 1000
      };
    }
   this.getPostsByFilters();
  }
  formatRange(value: number | null) {
    if (value >= 10) {
      return Math.round(value) + 'KM';
    }
    return null;
  }

}
