import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
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
  markers = [];
  infowindows = [];
  styles;

  marker;
  // cusom icon
  iconUrl = './assets/map/mark.svg';
  iconProp;
  public myoverlay;

  constructor(private breakpointObserver: BreakpointObserver,
              private http: HttpClient
  ) {
    this.http.get('/assets/map/styles.json')
              .subscribe( response => this.styles = response);
    this.zoomBreakpoints();
  }

  ngOnInit() {
    this.initMap();
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

  zoomBreakpoints() {
    if (this.breakpointObserver.isMatched('(max-width: 768px)')) {
      this.minZoom = 6;
    }
  }

 initMap() {

    this.mapProp = {
      styles: this.styles,
      center: new google.maps.LatLng(this.lat, this.lng),
      zoom: this.minZoom,
      minZoom: this.minZoom,
      // mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.gmapElement.nativeElement, this.mapProp);

    this.iconProp = {
      url: this.iconUrl,
      size: new google.maps.Size(100, 60),
      scaledSize: new google.maps.Size(70, 60),
      origin: new google.maps.Point(-15, 0)
    };

    this.dropMarks();

    this.myoverlay = new google.maps.OverlayView();
      this.myoverlay.draw = function () {
           // add an id to the layer that includes all the markers so you can use it in CSS
           this.getPanes().markerLayer.id = 'markerLayer';
       };
       this.myoverlay.setMap(this.map);
    setInterval( () => {
      this.markers.splice(3).forEach( a => a.setMap(null) );
      this.infowindows = this.infowindows.slice(3);
      this.dropMarks(3);
    }, 10000);
  }

  dropMarks(i: number = 0) {
    for (i; i < demoPins.length; i++) {
      this.addMarkerWithTimeout(demoPins[i], i * 300, i);
    }
  }

  addMarkerWithTimeout(data, timeout, index) {
    const contentString = `<div>${data.msg}</div>`;
    setTimeout( () => {
      this.infowindows.push(
        new google.maps.InfoWindow({
          content: contentString,
          maxWidth: 200
        })
      );
      const mark = new google.maps.Marker({
        position: new google.maps.LatLng(data.coordinates.lat, data.coordinates.lng),
        map: this.map,
        icon: this.iconProp,
        // must use optimized false for CSS
        optimized: false,
            // animation: google.maps.Animation.BOUNCE
      });
      mark.addListener('click', () => {
        this.infowindows[index].open(this.map, this.markers[index]);
      });
      this.markers.push(mark);
    }, timeout);
  }



}
const demoPins = [
  { msg: 'test',
    coordinates: {
      lng: 25.26031628038868,
      lat: 55.142389313138395
    }
  },
  { msg: 'test333',
    coordinates: {
      lng: 23.383485449218597,
      lat: 55.81684642017513
    }
  },
  { msg: 'test1',
    coordinates: {
      lng: 21.781312485897388,
      lat: 55.51995222659706
    }
  },
  { msg: 'test2',
    coordinates: {
      lng: 23.58947876628622,
      lat: 54.800819007978774
    }
  },
    { msg: 'test3',
      coordinates: {
        lng: 25.351869126522388,
        lat: 54.985102311600194
      }
  },
  { msg: 'test4',
    coordinates: {
      lng: 24.413454046213474,
      lat: 55.84255667295952
    }
  }
];
