import { Component, OnInit, ViewChild } from '@angular/core';

import { } from '@types/googlemaps';
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  title: 'My first AGM project';
  lat: number = 55.254299;
  lng: number = 23.886968;
  minZoom = 6;

  constructor() {

  }

  ngOnInit() {

    const mapProp = {
      center: new google.maps.LatLng(this.lat, this.lng),
      zoom: this.minZoom,
      minZoom: this.minZoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    this.limitPanning();
  }

  limitPanning() {
    const allowedBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(54.892278282770164, 22.935060156249847),
      new google.maps.LatLng(55.5883080546512, 25.072633398437347)
 );
 let lastValidCenter = this.map.getCenter();

 google.maps.event.addListener(this.map, 'center_changed', () => {
     if (allowedBounds.contains(this.map.getCenter())) {
         // still within valid bounds, so save the last valid position
         lastValidCenter = this.map.getCenter();
         return;
     }

     // not valid anymore => return to last valid position
     this.map.panTo(lastValidCenter);
 });
  }

}
