import { Component, OnInit, ViewChild } from '@angular/core';
import { } from '@types/googlemaps';

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  constructor() { }

  ngOnInit() {
    const mapProp = {
      center: new google.maps.LatLng(55.174692, 23.888514),
      zoom: 7.9,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      gestureHandling: 'none',
      zoomControl: false,
      styles: [{
        featureType: 'all',
        elementType: 'labels',
        stylers: [
          { visibility: 'off' }
        ]
      }]
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }
}
