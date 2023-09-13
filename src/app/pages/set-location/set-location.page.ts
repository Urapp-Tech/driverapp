// Import required modules
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
declare var google: any;

@Component({
  selector: 'app-set-location',
  templateUrl: './set-location.page.html',
  styleUrls: ['./set-location.page.scss'],
})
export class SetLocationPage implements OnInit {
  // Get reference to HTML element for map
  @ViewChild('map')
  mapRef!: ElementRef<HTMLElement>;
  // Initialize variables for current location, new map, and car icon
  currentLocation: { lat: number; lng: number } = { lat: 0, lng: 0 };
  newMap!: any;
  carIcon = {
    url: './assets/img/car-icon.png',
    size: { width: 32, height: 32 },
  };

  constructor(private readonly locationService: LocationService) {}

  async ngOnInit() {}

  // Get the current location using Capacitor's geolocation API
  async getCurrentLocation() {
    const [latitude, longitude] =
      await this.locationService.getCurrentPosition();
    this.currentLocation = {
      lat: latitude,
      lng: longitude,
    };
    console.log('Current location:', this.currentLocation);
    return this.currentLocation;
  }

  // After view initialization, initialize the map and add a marker for the current location
  async ngAfterViewInit() {
    let map = await this.initMap();
    console.log(map);
    this.addCurrentLocation();
  }

  // Add a marker for the current location
  async addCurrentLocation() {
    this.addMarker(this.currentLocation, this.carIcon);
  }

  // Initialize the map centered on the current location
  async initMap() {
    if (this.mapRef) {
      const currentPosition = await this.getCurrentLocation();
      // Create a new map object
      this.newMap = new google.maps.Map(this.mapRef.nativeElement, {
        zoom: 15,
        center: currentPosition,
        streetViewControl: false,
        disableDefaultUI: true,
      });
    }
    return this.newMap;
  }

  // Add a marker to the map at the specified location with optional icon
  addMarker(latlng: any, icon: any = null) {
    let position: any = {
      lat: latlng.lat,
      lng: latlng.lng,
    };
    // Create a new marker object
    const marker = new google.maps.Marker({
      position: position,
      map: this.newMap,
      icon: icon,
    });
    console.log('Marker added:', marker);
    return marker;
  }
}
