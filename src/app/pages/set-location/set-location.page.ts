// Import required modules
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-set-location',
  templateUrl: './set-location.page.html',
  styleUrls: ['./set-location.page.scss'],
})
export class SetLocationPage implements AfterViewInit {
  constructor(private readonly locationService: LocationService) {}

  // Get reference to HTML element for map
  @ViewChild('map')
  mapRef!: ElementRef<HTMLElement>;

  // Initialize variables for current location, new map, and car icon
  currentLocation: google.maps.LatLngLiteral = { lat: 0, lng: 0 };

  newMap!: any;

  // Get the current location using Capacitor's geolocation API
  async getCurrentLocation() {
    const [latitude, longitude] =
      await this.locationService.getCurrentPosition();
    this.currentLocation = {
      lat: latitude,
      lng: longitude,
    };
    return this.currentLocation;
  }

  // After view initialization, initialize the map and add a marker for the current location
  async ngAfterViewInit() {
    await this.initMap();
    this.addCurrentLocation();
  }

  // Add a marker for the current location
  async addCurrentLocation() {
    await this.getCurrentLocation();
    const carIcon = {
      url: 'assets/img/car-icon.png',
      anchor: new google.maps.Point(25, 25),
    };
    this.addMarker(this.currentLocation, carIcon);
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
  addMarker(
    latLng: google.maps.LatLngLiteral,
    icon: google.maps.Icon | null = null
  ) {
    // Create a new marker object
    const marker = new google.maps.Marker({
      position: latLng,
      map: this.newMap,
      icon,
    });
    console.log('Marker added:', marker);
    return marker;
  }
}
