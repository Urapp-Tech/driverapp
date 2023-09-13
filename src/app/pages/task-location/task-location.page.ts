import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';
declare var google: any;

@Component({
  selector: 'app-task-location',
  templateUrl: './task-location.page.html',
  styleUrls: ['./task-location.page.scss'],
})
export class TaskLocationPage implements OnInit {
  @ViewChild('map')
  mapRef!: ElementRef<HTMLElement>;
  currentLocation: { lat: number; lng: number } = { lat: 0, lng: 0 };
  selectedOption: string = '';
  newMap!: any;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  item!: any;
  selectedItem: any;
  buttonLabel: string = 'Start Driving';
  carIcon = {
    url: './assets/img/car-icon.png',
    size: { width: 32, height: 32 },
  };
  constructor(
    private readonly router: Router,
    private readonly location: Location,
    private readonly locationService: LocationService
  ) {}

  async ngOnInit() {}

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

  async ngAfterViewInit() {
    let currentNav = await this.router.getCurrentNavigation();
    console.log(currentNav, 'current');
    if (currentNav !== null) {
      this.item = currentNav.extras.state?.['item'];
    }

    let map = await this.initMap();

    if (this.item && map) {
      console.log(this.item, 'item');
      // To add location from address
      this.item.location = await this.getLocationFromAddress(this.item.address);

      this.directionsDisplay.setMap(this.newMap);
      this.setRoute();
    }
  }
  async addCurrentLocation() {
    //this.addMarker(this.currentLocation, carIcon);
    this.addMarker(this.currentLocation, this.carIcon);

    //Code for adding marker onclick
    /*google.maps.event.addListener(this.newMap, 'click', (event: any) => {
      const latlng = event.latLng.toJSON();
      this.addMarker(latlng);
    }); */
  }
  async initMap() {
    if (this.mapRef) {
      const currentPosition = await this.getCurrentLocation();
      this.newMap = new google.maps.Map(this.mapRef.nativeElement, {
        zoom: 15,
        center: currentPosition,
        streetViewControl: false,
        disableDefaultUI: true,
      });
    }
    return this.newMap;
  }

  previousMarker: any;
  addMarker(latlng: any, icon: any = null) {
    let position: any = {
      lat: latlng.lat,
      lng: latlng.lng,
    };

    const marker = new google.maps.Marker({
      position: position,
      map: this.newMap,
      icon: icon,
    });
    console.log('Marker added:', marker);
    return marker;
  }
  async setRoute() {
    if (this.previousMarker != null) {
      this.previousMarker.setMap(null);
    }
    // Save the current marker as the previous marker
    this.previousMarker = this.addMarker(this.item.location);
    // Display directions from the first marker to the current marker
    if (this.previousMarker != null) {
      const start = {
        lat: this.currentLocation.lat,
        lng: this.currentLocation.lng,
      };
      const end = this.item.location;
      console.log(end, 'end');
      this.calculateAndDisplayRoute(start, end);
    }
  }
  calculateAndDisplayRoute(start: any, end: any) {
    this.directionsService.route(
      {
        origin: start,
        destination: end,
        travelMode: 'DRIVING',
      },
      (response: any, status: any) => {
        if (status === 'OK') {
          this.directionsDisplay.setOptions({ suppressMarkers: true });

          const startLocation = response.routes[0].legs[0].start_location;
          const endLocation = response.routes[0].legs[0].end_location;
          const startMarker = new google.maps.Marker({
            position: response.routes[0].legs[0].start_location,
            map: this.newMap,
            icon: {
              url: 'assets/img/car-icon.png',
              anchor: new google.maps.Point(25, 25),
              rotation: google.maps.geometry.spherical.computeHeading(
                startLocation,
                endLocation
              ),
            },
          });
          console.log(startMarker);

          this.directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      }
    );
  }

  startDriving() {
    if (this.buttonLabel === 'Start Driving') {
      // Do something when button is clicked in "Start Driving" state
      this.buttonLabel = this.item.status;
    } else {
      // Do something when button is clicked in "Stop Driving" state
      this.location.back();
    }
  }
  async getLocationFromAddress(address: string) {
    console.log(address);
    const geocoder = new google.maps.Geocoder();
    const result = await geocoder.geocode({ address });
    console.log(geocoder, result);
    const location = {
      lat: result.results[0].geometry.location.lat(),
      lng: result.results[0].geometry.location.lng(),
    };
    return location;
  }
}
