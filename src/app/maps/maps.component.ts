import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import {  } from 'google-maps';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})

export class MapsComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  mapProp;
  title: 'My first AGM project';
  lat = 55.254299;
  lng = 23.886968;
  minZoom = 7;

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    if (this.breakpointObserver.isMatched('(max-width: 768px)')) {
      this.minZoom = 6;
    }
    this.mapProp = {
      center: new google.maps.LatLng(this.lat, this.lng),
      zoom: this.minZoom,
      minZoom: this.minZoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, this.mapProp);

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
