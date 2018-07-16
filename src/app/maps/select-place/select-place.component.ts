import { Component, OnInit, ViewChild, EventEmitter, Output  } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

import {  } from 'google-maps';

@Component({
  selector: 'app-select-place',
  templateUrl: './select-place.component.html',
  styleUrls: ['./select-place.component.scss']
})
export class SelectPlaceComponent implements OnInit {

  @ViewChild('selectMap') gmapElement: any;
  @ViewChild('acInput') input: any;
  map2: google.maps.Map;
  mapProp;
  lat = 55.254299;
  lng = 23.886968;
  cordinates: { latitude: number, longitude: number};
  minZoom = 6;
  place;
  autocomplete;
  selectMark;
  draggable = true;
  markerShow = false;

  @Output() sendCoordinates = new EventEmitter<object>();

  constructor(private breakpointObserver: BreakpointObserver) {
    this.screenBreak();
   }

  ngOnInit() {
    this.initMap();

  }
  initMap() {

    this.mapProp = {
      center: new google.maps.LatLng(this.lat, this.lng),
      zoom: this.minZoom,
      minZoom: this.minZoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false,

    };

    this.map2 = new google.maps.Map(this.gmapElement.nativeElement, this.mapProp);
    this.initAutoComplete();
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(position => {
      this.cordinates = position.coords;
      this.creatMarker();
    });
  }
  initAutoComplete() {

    this.autocomplete = new google.maps.places.Autocomplete(this.input.nativeElement);
    this.autocomplete.bindTo('bounds', this.map2);
    this.autocomplete.setOptions({strictBounds: true, types: ['geocode']});
    this.selectMark = new google.maps.Marker({
      map: this.map2,
      position: null,
      draggable: this.draggable
    });
    this.autocomplete.addListener('place_changed', () => {

      this.selectMark.setVisible(false);
      this.place = this.autocomplete.getPlace();
      if (!this.place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("Nerasta vieta '" + this.place.name + "'");
        return;
      }
      if (this.selectMark && this.selectMark.setMap) {
        this.selectMark.setMap(null);
        this.markerShow = false;
      }
      // If the place has a geometry, then present it on a map.
      if (this.place.geometry.viewport) {
        this.map2.fitBounds(this.place.geometry.viewport);
      } else {
        this.map2.setCenter(this.place.geometry.location);
        this.map2.setZoom(17);  // Why 17? Because it looks good.
      }

      this.selectMark.setMap(this.map2);
      if (!this.draggable) {
        this.selectMark.setVisible(true);
        this.selectMark.setPosition(new google.maps.LatLng(this.map2.getCenter().lat(), this.map2.getCenter().lng()));

          this.map2.addListener('center_changed', () => {
            if (this.selectMark && this.selectMark.setMap) {
              this.selectMark.setPosition(new google.maps.LatLng(this.map2.getCenter().lat(), this.map2.getCenter().lng()));
             let cords = {
              latitude: this.selectMark.getPosition().lat(),
              longitude: this.selectMark.getPosition().lng()
             };
             this.sendCoordinates.emit(cords);
            }
          });
      } else {
        this.markerShow = true;
        this.selectMark.setVisible(true);
        this.selectMark.setPosition(this.place.geometry.location);
        this.selectMark.addListener('dragend', () => {
          this.map2.setCenter(this.selectMark.getPosition());
          this.map2.setZoom(17);
          let cords = {
            latitude: this.selectMark.getPosition().lat(),
            longitude: this.selectMark.getPosition().lng(),
          };
          this.sendCoordinates.emit(cords);
        });
      }

    });
  }
  screenBreak(){
    if (this.breakpointObserver.isMatched('(max-width: 768px)')) {
      this.draggable = false;
     }
  }
  addMarker() {
    if(!this.markerShow) {
      this.creatMarker();
    }
  }
  creatMarker() {
    if (!this.cordinates) {
      this.markerShow = true;
      let cords = {
        latitude: this.map2.getCenter().lat(),
        longitude: this.map2.getCenter().lng()
        }
      } else {
        let  cords = this.cordinates;
      }
    if (this.selectMark && this.selectMark.setMap) {
      this.markerShow = false;
      this.selectMark.setMap(null);
      this.input.nativeElement.value = '';
    }
    this.selectMark = new google.maps.Marker({
      position: new google.maps.LatLng(cords.latitude, cords.longitude),
      map: this.map2,
      draggable: this.draggable,

    });

    this.map2.setCenter(new google.maps.LatLng(cords.latitude, cords.longitude));
    // this.map2.setZoom(10);
    if (!this.draggable) {
      this.markerShow = true;
      this.map2.setZoom(13);  // Why 17? Because it looks good.
      this.map2.addListener('center_changed', () => {
        if (this.selectMark && this.selectMark.setMap) {
            this.selectMark.setPosition(new google.maps.LatLng(this.map2.getCenter().lat(), this.map2.getCenter().lng()));
            let cords = {
              latitude: this.selectMark.getPosition().lat(),
              longitude: this.selectMark.getPosition().lng(),
            }
            this.sendCoordinates.emit(cords);
        }
      });
    } else {
      this.markerShow = true;
        this.selectMark.addListener('dragend', () => {
          this.map2.setCenter(this.selectMark.getPosition());
          // this.map2.setZoom(17);
          let cords = {
            latitude: this.selectMark.getPosition().lat(),
            longitude: this.selectMark.getPosition().lng(),
          };
          this.sendCoordinates.emit(cords);
        });
    }
  }
}
