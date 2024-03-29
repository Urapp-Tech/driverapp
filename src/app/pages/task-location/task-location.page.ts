import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonRouterOutlet, NavController } from '@ionic/angular';
import { LocationService } from 'src/app/services/location.service';
import {
  AssignedOrder,
  AssignedOrderDetails,
  DeliveryStatus,
  GetAssignedOrderDetailsResponse,
  SetOrderStatusPayload,
  SetOrderStatusResponse,
} from 'src/app/types/tasks.types';
import {
  DELIVERY_STATUS,
  TEMP_PICKUP_ADDRESS,
} from 'src/app/utilities/constants';
import { ionGoBack } from 'src/app/utilities/ionic-go-back-function';
import { TaskLocationService } from './task-location.service';

@Component({
  selector: 'app-task-location',
  templateUrl: './task-location.page.html',
  styleUrls: ['./task-location.page.scss'],
})
export class TaskLocationPage implements AfterViewInit {
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly navController: NavController,
    private readonly locationService: LocationService,
    private readonly taskLocationService: TaskLocationService,
    private readonly ionRouterOutlet: IonRouterOutlet
  ) {}

  @ViewChild('map', { static: true })
  mapRef!: ElementRef<HTMLDivElement>;

  currentLocation: google.maps.LatLngLiteral = { lat: 0, lng: 0 };

  selectedOption: string = '';

  newMap!: google.maps.Map;

  directionsService = new google.maps.DirectionsService();

  directionsDisplay = new google.maps.DirectionsRenderer();

  item!: AssignedOrder;

  orderDeliveryId!: string | null;

  buttonLabel: string = 'Start Driving';

  dropLocationMarker: google.maps.Marker | null = null;

  pickupLocationMarker: google.maps.Marker | null = null;

  startMarker: google.maps.Marker | null = null;

  myGoBack = ionGoBack({
    ionRouterOutlet: this.ionRouterOutlet,
    navController: this.navController,
  });

  async ngAfterViewInit() {
    this.orderDeliveryId =
      this.activatedRoute.snapshot.queryParamMap.get('orderId');
    if (!this.orderDeliveryId) {
      this.navController.back();
      return;
    }
    await this.initMap();
    this.getAssignedOrderDetails(this.orderDeliveryId);
  }

  async getCurrentLocation() {
    const [latitude, longitude] =
      await this.locationService.getCurrentPosition();
    this.currentLocation = {
      lat: latitude,
      lng: longitude,
    };
    console.log('currentLocation :>> ', this.currentLocation);
    return this.currentLocation;
  }

  async addCurrentLocation() {
    // this.addMarker(this.currentLocation, carIcon);
    if (this.startMarker) {
      this.startMarker.setPosition(this.currentLocation);
    }

    // Code for adding marker onclick
    /* google.maps.event.addListener(this.newMap, 'click', (event: any) => {
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

  addMarker(
    coordinates: google.maps.LatLngLiteral,
    icon:
      | string
      | google.maps.Icon
      | google.maps.Symbol
      | null
      | undefined = null
  ) {
    const marker = new google.maps.Marker({
      position: coordinates,
      map: this.newMap,
      icon,
    });
    console.log('marker added:>> ', marker);
    return marker;
  }

  async setRoute(location: google.maps.LatLngLiteral) {
    await this.getCurrentLocation();
    const start: google.maps.LatLngLiteral = {
      lat: this.currentLocation.lat,
      lng: this.currentLocation.lng,
    };
    const end: google.maps.LatLngLiteral = location;
    console.log('end :>> ', end);
    this.calculateAndDisplayRoute(start, end);
  }

  calculateAndDisplayRoute(
    start: google.maps.LatLngLiteral,
    end: google.maps.LatLngLiteral
  ) {
    this.directionsDisplay.setMap(this.newMap);
    this.directionsService.route(
      {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (
        response: google.maps.DirectionsResult | null,
        status: google.maps.DirectionsStatus
      ) => {
        if (status === 'OK' && response) {
          this.directionsDisplay.setOptions({ suppressMarkers: true });
          const startLocation = response.routes[0].legs[0].start_location;
          const endLocation = response.routes[0].legs[0].end_location;
          this.startMarker = new google.maps.Marker({
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
          this.directionsDisplay.setDirections(response);
        } else {
          console.log('response :>> ', response);
          console.log('status :>> ', status);
        }
      }
    );
  }

  acceptDelivery() {
    if (!this.orderDeliveryId) {
      return;
    }
    const payload: SetOrderStatusPayload = {
      appOrderDelivery: this.orderDeliveryId,
      status: DELIVERY_STATUS.ACCEPTED,
    };
    this.setOrderStatus(payload);
  }

  pickupItem() {
    if (!this.orderDeliveryId) {
      return;
    }
    const payload: SetOrderStatusPayload = {
      appOrderDelivery: this.orderDeliveryId,
      status: DELIVERY_STATUS.IN_DELIVERY,
    };
    this.setOrderStatus(payload);
  }

  deliverItem() {
    if (!this.orderDeliveryId) {
      return;
    }
    const payload: SetOrderStatusPayload = {
      appOrderDelivery: this.orderDeliveryId,
      status: DELIVERY_STATUS.DELIVERED,
    };
    this.setOrderStatus(payload);
  }

  buttonAction() {
    if (this.item.status === DELIVERY_STATUS.NEW) {
      this.acceptDelivery();
      return;
    }
    if (this.item.status === DELIVERY_STATUS.ACCEPTED) {
      this.pickupItem();
      return;
    }
    if (this.item.status === DELIVERY_STATUS.IN_DELIVERY) {
      this.deliverItem();
      return;
    }
    if (this.item.status === DELIVERY_STATUS.DELIVERED) {
      this.myGoBack('/tasks');
    }
  }

  getButtonLabel(status: DeliveryStatus) {
    if (status === DELIVERY_STATUS.NEW) {
      return 'Accept';
    }
    if (status === DELIVERY_STATUS.ACCEPTED) {
      return 'Pick Up';
    }
    if (status === DELIVERY_STATUS.IN_DELIVERY) {
      return 'Delivered';
    }
    if (status === DELIVERY_STATUS.DELIVERED) {
      return 'Back';
    }
    return 'Start Driving';
  }

  // startDriving() {
  //   if (this.item.status === DELIVERY_STATUS.NEW) {
  //   }
  //   if (this.buttonLabel === 'Start Driving') {
  //     // Do something when button is clicked in "Start Driving" state
  //     this.buttonLabel = this.getButtonLabel(this.item.status);
  //   } else {
  //     // Do something when button is clicked in "Stop Driving" state
  //     this.location.back();
  //   }
  // }

  async getLocationFromAddress(address: string) {
    console.log(address);
    const geocoder = new google.maps.Geocoder();
    const result = await geocoder.geocode({ address });
    console.log(geocoder, result);
    const location: google.maps.LatLngLiteral = {
      lat: result.results[0].geometry.location.lat(),
      lng: result.results[0].geometry.location.lng(),
    };
    return location;
  }

  moveToLocation(marker: google.maps.Marker) {
    const markerPosition = marker.getPosition();
    if (markerPosition) {
      this.newMap.setCenter(markerPosition);
    }
  }

  async handleStatusNew(data: AssignedOrderDetails) {
    if (this.pickupLocationMarker) {
      this.pickupLocationMarker.setMap(null);
      this.pickupLocationMarker = null;
    }
    const pickupLocation =
      await this.getLocationFromAddress(TEMP_PICKUP_ADDRESS);
    const shopIcon = {
      url: 'assets/img/shop-pin-icon.png',
      scaledSize: new google.maps.Size(32, 44),
    };
    this.pickupLocationMarker = this.addMarker(pickupLocation, shopIcon);
    this.pickupLocationMarker.setMap(this.newMap);

    if (this.dropLocationMarker) {
      this.dropLocationMarker.setMap(null);
      this.dropLocationMarker = null;
    }
    const dropLocation = await this.getLocationFromAddress(
      data.order.appUserAddress.address
    );
    const homeIcon = {
      url: 'assets/img/home-pin-icon.png',
      scaledSize: new google.maps.Size(32, 44),
    };
    this.dropLocationMarker = this.addMarker(dropLocation, homeIcon);
    this.dropLocationMarker.setMap(this.newMap);
  }

  async handleStatusDelivered(data: AssignedOrderDetails) {
    if (this.pickupLocationMarker) {
      this.pickupLocationMarker.setMap(null);
      this.pickupLocationMarker = null;
    }
    const pickupLocation =
      await this.getLocationFromAddress(TEMP_PICKUP_ADDRESS);
    const shopIcon = {
      url: 'assets/img/shop-pin-icon.png',
      scaledSize: new google.maps.Size(32, 44),
    };
    this.pickupLocationMarker = this.addMarker(pickupLocation, shopIcon);
    this.pickupLocationMarker.setMap(this.newMap);

    if (this.dropLocationMarker) {
      this.dropLocationMarker.setMap(null);
      this.dropLocationMarker = null;
    }
    const dropLocation = await this.getLocationFromAddress(
      data.order.appUserAddress.address
    );
    const homeIcon = {
      url: 'assets/img/home-pin-icon.png',
      scaledSize: new google.maps.Size(32, 44),
    };
    this.dropLocationMarker = this.addMarker(dropLocation, homeIcon);
    this.dropLocationMarker.setMap(this.newMap);
  }

  async handleStatusAccepted() {
    if (this.dropLocationMarker) {
      this.dropLocationMarker.setMap(null);
      this.dropLocationMarker = null;
    }
    if (this.pickupLocationMarker) {
      this.pickupLocationMarker.setMap(null);
      this.pickupLocationMarker = null;
    }
    const pickupLocation =
      await this.getLocationFromAddress(TEMP_PICKUP_ADDRESS);
    const shopIcon = {
      url: 'assets/img/shop-pin-icon.png',
      scaledSize: new google.maps.Size(32, 44),
    };
    this.pickupLocationMarker = this.addMarker(pickupLocation, shopIcon);
    this.pickupLocationMarker.setMap(this.newMap);
    const pickupLocationPosition = this.pickupLocationMarker
      .getPosition()
      ?.toJSON();
    if (pickupLocationPosition) {
      this.setRoute(pickupLocationPosition);
    }
  }

  async handleStatusInDelivery(data: AssignedOrderDetails) {
    if (this.pickupLocationMarker) {
      this.pickupLocationMarker.setMap(null);
      this.pickupLocationMarker = null;
    }
    if (this.dropLocationMarker) {
      this.dropLocationMarker.setMap(null);
      this.dropLocationMarker = null;
    }
    const dropLocation = await this.getLocationFromAddress(
      data.order.appUserAddress.address
    );
    const homeIcon = {
      url: 'assets/img/home-pin-icon.png',
      scaledSize: new google.maps.Size(32, 44),
    };
    this.dropLocationMarker = this.addMarker(dropLocation, homeIcon);
    this.dropLocationMarker.setMap(this.newMap);
    const dropLocationPosition = this.dropLocationMarker
      .getPosition()
      ?.toJSON();
    if (dropLocationPosition) {
      this.setRoute(dropLocationPosition);
    }
  }

  getAssignedOrderDetails(id: string) {
    const handleResponse = async (
      response: GetAssignedOrderDetailsResponse
    ) => {
      console.log('response :>> ', response);
      if (response.success) {
        this.item = response.data.order;
        this.buttonLabel = this.getButtonLabel(this.item.status);
        this.directionsDisplay.setMap(null);
        this.startMarker?.setMap(null);
        if (response.data.order.status === DELIVERY_STATUS.NEW) {
          this.handleStatusNew(response.data);
          return;
        }
        if (response.data.order.status === DELIVERY_STATUS.ACCEPTED) {
          this.handleStatusAccepted();
          return;
        }
        if (response.data.order.status === DELIVERY_STATUS.IN_DELIVERY) {
          this.handleStatusInDelivery(response.data);
          return;
        }
        if (this.item.status === DELIVERY_STATUS.DELIVERED) {
          this.handleStatusDelivered(response.data);
        }
      }
    };
    const handleError = (error: any) => {
      console.error('error :>> ', error);
    };
    this.taskLocationService.getAssignedOrderDetails(id).subscribe({
      next: handleResponse,
      error: handleError,
    });
  }

  setOrderStatus(payload: SetOrderStatusPayload) {
    const handleResponse = async (response: SetOrderStatusResponse) => {
      if (response.success) {
        this.buttonLabel = this.getButtonLabel(response.data.order.status);
        this.item.status = response.data.order.status;
        this.directionsDisplay.setMap(null);
        this.startMarker?.setMap(null);
        if (response.data.order.status === DELIVERY_STATUS.NEW) {
          this.handleStatusNew(response.data);
          return;
        }
        if (response.data.order.status === DELIVERY_STATUS.ACCEPTED) {
          this.handleStatusAccepted();
          return;
        }
        if (response.data.order.status === DELIVERY_STATUS.IN_DELIVERY) {
          this.handleStatusInDelivery(response.data);
          return;
        }
        if (this.item.status === DELIVERY_STATUS.DELIVERED) {
          this.handleStatusDelivered(response.data);
        }
      }
    };
    const handleError = (error: any) => {
      console.error('error :>> ', error);
    };
    this.taskLocationService.setOrderStatus(payload).subscribe({
      next: handleResponse,
      error: handleError,
    });
  }
}
