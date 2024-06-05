import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IonRouterOutlet,
  ModalController,
  ModalOptions,
  NavController,
} from '@ionic/angular';
import { ConfirmationModal } from 'src/app/modals/confirmation/confirmation.modal';
import { LocationService } from 'src/app/services/location.service';
import { StorageService } from 'src/app/services/storage.service';
import { SystemConfigData } from 'src/app/types/app.types';
import {
  AssignedOrder,
  AssignedOrderDetails,
  GetAssignedOrderDetailsResponse,
  OrderStatus,
  SetOrderStatusPayload,
  SetOrderStatusResponse,
} from 'src/app/types/tasks.types';
import { ORDER_STATUS } from 'src/app/utilities/constants';
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
    private readonly ionRouterOutlet: IonRouterOutlet,
    private readonly locationService: LocationService,
    private readonly modalController: ModalController,
    private readonly navController: NavController,
    private readonly storageService: StorageService,
    private readonly taskLocationService: TaskLocationService
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

  buttonLabel = 'Start Driving';

  button2Label = '';

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
      console.log(' this.orderDeliveryId :>> ', this.orderDeliveryId);
      this.myGoBack('/tasks');
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

  acceptToPickUpItemFromCustomer() {
    if (!this.orderDeliveryId) {
      return;
    }
    const payload: SetOrderStatusPayload = {
      appOrderDelivery: this.orderDeliveryId,
      status: ORDER_STATUS.DRIVER_ACCEPTED_TO_PICK_UP_ITEM_FROM_CUSTOMER,
    };
    this.setOrderStatus(payload);
  }

  pickUpItemFromCustomer() {
    if (!this.orderDeliveryId) {
      return;
    }
    const payload: SetOrderStatusPayload = {
      appOrderDelivery: this.orderDeliveryId,
      status: ORDER_STATUS.DRIVER_PICKED_UP_ITEM_FROM_CUSTOMER,
    };
    this.setOrderStatus(payload);
  }

  deliveredItemToShop() {
    if (!this.orderDeliveryId) {
      return;
    }
    const payload: SetOrderStatusPayload = {
      appOrderDelivery: this.orderDeliveryId,
      status: ORDER_STATUS.DRIVER_DELIVERED_ITEM_TO_SHOP,
    };
    this.setOrderStatus(payload);
  }

  acceptToPickUpItemFromShop() {
    if (!this.orderDeliveryId) {
      return;
    }
    const payload: SetOrderStatusPayload = {
      appOrderDelivery: this.orderDeliveryId,
      status: ORDER_STATUS.DRIVER_ACCEPTED_TO_PICK_UP_ITEM_FROM_SHOP,
    };
    this.setOrderStatus(payload);
  }

  pickUpItemFromShop() {
    if (!this.orderDeliveryId) {
      return;
    }
    const payload: SetOrderStatusPayload = {
      appOrderDelivery: this.orderDeliveryId,
      status: ORDER_STATUS.DRIVER_PICKED_UP_ITEM_FROM_SHOP,
    };
    this.setOrderStatus(payload);
  }

  deliveredItemToCustomer() {
    if (!this.orderDeliveryId) {
      return;
    }
    const payload: SetOrderStatusPayload = {
      appOrderDelivery: this.orderDeliveryId,
      status: ORDER_STATUS.DRIVER_DELIVERED_ITEM_TO_CUSTOMER,
    };
    this.setOrderStatus(payload);
  }

  buttonAction() {
    if (this.item.status === ORDER_STATUS.DRIVER_ASSIGNED_FOR_ITEM_PICKUP) {
      this.acceptToPickUpItemFromCustomer();
      return;
    }
    if (
      this.item.status ===
      ORDER_STATUS.DRIVER_ACCEPTED_TO_PICK_UP_ITEM_FROM_CUSTOMER
    ) {
      this.pickUpItemFromCustomer();
      return;
    }
    if (this.item.status === ORDER_STATUS.DRIVER_PICKED_UP_ITEM_FROM_CUSTOMER) {
      this.deliveredItemToShop();
      return;
    }
    if (this.item.status === ORDER_STATUS.DRIVER_DELIVERED_ITEM_TO_SHOP) {
      this.myGoBack('/tasks');
      return;
    }
    if (this.item.status === ORDER_STATUS.DRIVER_ASSIGNED_FOR_ITEM_DELIVERY) {
      this.acceptToPickUpItemFromShop();
      return;
    }
    if (
      this.item.status ===
      ORDER_STATUS.DRIVER_ACCEPTED_TO_PICK_UP_ITEM_FROM_SHOP
    ) {
      this.pickUpItemFromShop();
      return;
    }
    if (this.item.status === ORDER_STATUS.DRIVER_PICKED_UP_ITEM_FROM_SHOP) {
      this.deliveredItemToCustomer();
      return;
    }
    if (this.item.status === ORDER_STATUS.DRIVER_DELIVERED_ITEM_TO_CUSTOMER) {
      this.myGoBack('/tasks');
    }
  }

  getButtonLabel(status: OrderStatus) {
    if (status === ORDER_STATUS.DRIVER_ASSIGNED_FOR_ITEM_PICKUP) {
      return 'Accept';
    }
    if (status === ORDER_STATUS.DRIVER_ACCEPTED_TO_PICK_UP_ITEM_FROM_CUSTOMER) {
      return 'Pick Up';
    }
    if (status === ORDER_STATUS.DRIVER_PICKED_UP_ITEM_FROM_CUSTOMER) {
      return 'Delivered';
    }
    if (status === ORDER_STATUS.DRIVER_DELIVERED_ITEM_TO_SHOP) {
      return 'Back';
    }
    if (status === ORDER_STATUS.DRIVER_ASSIGNED_FOR_ITEM_DELIVERY) {
      return 'Accept';
    }
    if (status === ORDER_STATUS.DRIVER_ACCEPTED_TO_PICK_UP_ITEM_FROM_SHOP) {
      return 'Pick Up';
    }
    if (status === ORDER_STATUS.DRIVER_PICKED_UP_ITEM_FROM_SHOP) {
      return 'Delivered';
    }
    if (status === ORDER_STATUS.DRIVER_DELIVERED_ITEM_TO_CUSTOMER) {
      return 'Back';
    }
    return 'Start Driving';
  }

  button2Action() {
    console.log('this.item.status :>> ', this.item.status);
    if (this.item.status === ORDER_STATUS.DRIVER_ASSIGNED_FOR_ITEM_PICKUP) {
      this.showConfirmationModal(
        `Are You Sure You Don't Want To Pickup This Package ?`,
        `Decline`,
        `Back`,
        () => {
          if (!this.orderDeliveryId) {
            return;
          }
          const payload: SetOrderStatusPayload = {
            appOrderDelivery: this.orderDeliveryId,
            status: ORDER_STATUS.DRIVER_DECLINED_TO_PICKUP_ITEM_FROM_CUSTOMER,
          };
          this.setOrderStatus(payload);
        }
      );
      return;
    }
    if (this.item.status === ORDER_STATUS.DRIVER_PICKED_UP_ITEM_FROM_CUSTOMER) {
      this.showConfirmationModal(
        `Did You Returned Package To Customer`,
        `Yes`,
        `No`,
        () => {
          if (!this.orderDeliveryId) {
            return;
          }
          const payload: SetOrderStatusPayload = {
            appOrderDelivery: this.orderDeliveryId,
            status: ORDER_STATUS.DRIVER_RETURNED_ITEM_TO_CUSTOMER,
          };
          this.setOrderStatus(payload);
        }
      );
      return;
    }
    if (this.item.status === ORDER_STATUS.DRIVER_ASSIGNED_FOR_ITEM_DELIVERY) {
      this.showConfirmationModal(
        `Are You Sure You Don't Want To Deliver This Package ?`,
        `Decline`,
        `Back`,
        () => {
          if (!this.orderDeliveryId) {
            return;
          }
          const payload: SetOrderStatusPayload = {
            appOrderDelivery: this.orderDeliveryId,
            status: ORDER_STATUS.DRIVER_DECLINED_TO_PICKUP_ITEM_FROM_SHOP,
          };
          this.setOrderStatus(payload);
        }
      );
      return;
    }
    if (this.item.status === ORDER_STATUS.DRIVER_PICKED_UP_ITEM_FROM_SHOP) {
      this.showConfirmationModal(
        `Did You Returned Package To Shop`,
        `Yes`,
        `No`,
        () => {
          if (!this.orderDeliveryId) {
            return;
          }
          const payload: SetOrderStatusPayload = {
            appOrderDelivery: this.orderDeliveryId,
            status: ORDER_STATUS.DRIVER_RETURNED_ITEM_TO_SHOP,
          };
          this.setOrderStatus(payload);
        }
      );
    }
  }

  getButton2Label(status: OrderStatus) {
    if (status === ORDER_STATUS.DRIVER_ASSIGNED_FOR_ITEM_PICKUP) {
      return 'Decline';
    }
    if (status === ORDER_STATUS.DRIVER_PICKED_UP_ITEM_FROM_CUSTOMER) {
      return 'Return';
    }
    if (status === ORDER_STATUS.DRIVER_ASSIGNED_FOR_ITEM_DELIVERY) {
      return 'Decline';
    }
    if (status === ORDER_STATUS.DRIVER_PICKED_UP_ITEM_FROM_SHOP) {
      return 'Return';
    }
    return '';
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

  // HAPPY CASE 1
  async handleStatusAssignedForItemPickup(data: AssignedOrderDetails) {
    const systemConfigData =
      await this.storageService.get<SystemConfigData>('SYSTEM_CONFIG_DATA');
    if (!systemConfigData) {
      return;
    }

    if (this.pickupLocationMarker) {
      this.pickupLocationMarker.setMap(null);
      this.pickupLocationMarker = null;
    }
    const pickupLocation = await this.getLocationFromAddress(
      data.order.appUserAddress.address
    );
    const homeIcon = {
      url: 'assets/img/home-pin-icon.png',
      scaledSize: new google.maps.Size(32, 44),
    };
    this.pickupLocationMarker = this.addMarker(pickupLocation, homeIcon);
    this.pickupLocationMarker.setMap(this.newMap);

    if (this.dropLocationMarker) {
      this.dropLocationMarker.setMap(null);
      this.dropLocationMarker = null;
    }
    const dropLocation = await this.getLocationFromAddress(
      systemConfigData.tenantConfig.shopAddress
    );
    const shopIcon = {
      url: 'assets/img/shop-pin-icon.png',
      scaledSize: new google.maps.Size(32, 44),
    };
    this.dropLocationMarker = this.addMarker(dropLocation, shopIcon);
    this.dropLocationMarker.setMap(this.newMap);
  }

  // HAPPY CASE 2
  async handleStatusAcceptedToPickUpItemFromCustomer(
    data: AssignedOrderDetails
  ) {
    if (this.dropLocationMarker) {
      this.dropLocationMarker.setMap(null);
      this.dropLocationMarker = null;
    }

    if (this.pickupLocationMarker) {
      this.pickupLocationMarker.setMap(null);
      this.pickupLocationMarker = null;
    }
    const pickupLocation = await this.getLocationFromAddress(
      data.order.appUserAddress.address
    );
    const homeIcon = {
      url: 'assets/img/home-pin-icon.png',
      scaledSize: new google.maps.Size(32, 44),
    };
    this.pickupLocationMarker = this.addMarker(pickupLocation, homeIcon);
    this.pickupLocationMarker.setMap(this.newMap);

    this.setRoute(pickupLocation);
  }

  // HAPPY CASE 3
  async handleStatusPickedUpItemFromCustomer() {
    const systemConfigData =
      await this.storageService.get<SystemConfigData>('SYSTEM_CONFIG_DATA');
    if (!systemConfigData) {
      return;
    }

    if (this.pickupLocationMarker) {
      this.pickupLocationMarker.setMap(null);
      this.pickupLocationMarker = null;
    }

    if (this.dropLocationMarker) {
      this.dropLocationMarker.setMap(null);
      this.dropLocationMarker = null;
    }
    const dropLocation = await this.getLocationFromAddress(
      systemConfigData.tenantConfig.shopAddress
    );
    const shopIcon = {
      url: 'assets/img/shop-pin-icon.png',
      scaledSize: new google.maps.Size(32, 44),
    };
    this.dropLocationMarker = this.addMarker(dropLocation, shopIcon);
    this.dropLocationMarker.setMap(this.newMap);

    this.setRoute(dropLocation);
  }

  // HAPPY CASE 4
  async handleStatusDeliveredItemToShop(data: AssignedOrderDetails) {
    const systemConfigData =
      await this.storageService.get<SystemConfigData>('SYSTEM_CONFIG_DATA');
    if (!systemConfigData) {
      return;
    }

    if (this.pickupLocationMarker) {
      this.pickupLocationMarker.setMap(null);
      this.pickupLocationMarker = null;
    }
    const pickupLocation = await this.getLocationFromAddress(
      data.order.appUserAddress.address
    );
    const homeIcon = {
      url: 'assets/img/home-pin-icon.png',
      scaledSize: new google.maps.Size(32, 44),
    };
    this.pickupLocationMarker = this.addMarker(pickupLocation, homeIcon);
    this.pickupLocationMarker.setMap(this.newMap);

    if (this.dropLocationMarker) {
      this.dropLocationMarker.setMap(null);
      this.dropLocationMarker = null;
    }
    const dropLocation = await this.getLocationFromAddress(
      systemConfigData.tenantConfig.shopAddress
    );
    const shopIcon = {
      url: 'assets/img/shop-pin-icon.png',
      scaledSize: new google.maps.Size(32, 44),
    };
    this.dropLocationMarker = this.addMarker(dropLocation, shopIcon);
    this.dropLocationMarker.setMap(this.newMap);
  }

  // HAPPY CASE 5
  async handleStatusAssignedForItemDelivery(data: AssignedOrderDetails) {
    const systemConfigData =
      await this.storageService.get<SystemConfigData>('SYSTEM_CONFIG_DATA');
    if (!systemConfigData) {
      return;
    }

    if (this.pickupLocationMarker) {
      this.pickupLocationMarker.setMap(null);
      this.pickupLocationMarker = null;
    }
    const pickupLocation = await this.getLocationFromAddress(
      systemConfigData.tenantConfig.shopAddress
    );
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

  // HAPPY CASE 6
  async handleStatusAcceptedToPickUpItemFromShop() {
    const systemConfigData =
      await this.storageService.get<SystemConfigData>('SYSTEM_CONFIG_DATA');
    if (!systemConfigData) {
      return;
    }

    if (this.dropLocationMarker) {
      this.dropLocationMarker.setMap(null);
      this.dropLocationMarker = null;
    }

    if (this.pickupLocationMarker) {
      this.pickupLocationMarker.setMap(null);
      this.pickupLocationMarker = null;
    }
    const pickupLocation = await this.getLocationFromAddress(
      systemConfigData.tenantConfig.shopAddress
    );
    const shopIcon = {
      url: 'assets/img/shop-pin-icon.png',
      scaledSize: new google.maps.Size(32, 44),
    };
    this.pickupLocationMarker = this.addMarker(pickupLocation, shopIcon);
    this.pickupLocationMarker.setMap(this.newMap);

    this.setRoute(pickupLocation);
  }

  // HAPPY CASE 7
  async handleStatusPickedUpItemFromShop(data: AssignedOrderDetails) {
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

    this.setRoute(dropLocation);
  }

  // HAPPY CASE 8
  async handleStatusDeliveredItemToCustomer(data: AssignedOrderDetails) {
    const systemConfigData =
      await this.storageService.get<SystemConfigData>('SYSTEM_CONFIG_DATA');
    if (!systemConfigData) {
      return;
    }

    if (this.pickupLocationMarker) {
      this.pickupLocationMarker.setMap(null);
      this.pickupLocationMarker = null;
    }
    const pickupLocation = await this.getLocationFromAddress(
      systemConfigData.tenantConfig.shopAddress
    );
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

  getAssignedOrderDetails(id: string) {
    const handleResponse = async (
      response: GetAssignedOrderDetailsResponse
    ) => {
      if (response.success) {
        this.item = response.data.order;

        this.buttonLabel = this.getButtonLabel(this.item.status);
        this.button2Label = this.getButton2Label(this.item.status);
        this.directionsDisplay.setMap(null);
        this.startMarker?.setMap(null);
        console.log('this.item.status :>> ', this.item.status);
        if (
          response.data.order.status ===
          ORDER_STATUS.DRIVER_ASSIGNED_FOR_ITEM_PICKUP
        ) {
          // HAPPY CASE 1
          this.handleStatusAssignedForItemPickup(response.data);
          return;
        }
        if (
          response.data.order.status ===
          ORDER_STATUS.DRIVER_ACCEPTED_TO_PICK_UP_ITEM_FROM_CUSTOMER
        ) {
          // HAPPY CASE 2
          this.handleStatusAcceptedToPickUpItemFromCustomer(response.data);
          return;
        }
        if (
          response.data.order.status ===
          ORDER_STATUS.DRIVER_PICKED_UP_ITEM_FROM_CUSTOMER
        ) {
          // HAPPY CASE 3
          this.handleStatusPickedUpItemFromCustomer();
          return;
        }
        if (
          response.data.order.status ===
          ORDER_STATUS.DRIVER_DELIVERED_ITEM_TO_SHOP
        ) {
          // HAPPY CASE 4
          this.handleStatusDeliveredItemToShop(response.data);
          return;
        }
        if (
          response.data.order.status ===
          ORDER_STATUS.DRIVER_ASSIGNED_FOR_ITEM_DELIVERY
        ) {
          // HAPPY CASE 5
          this.handleStatusAssignedForItemDelivery(response.data);
          return;
        }
        if (
          response.data.order.status ===
          ORDER_STATUS.DRIVER_ACCEPTED_TO_PICK_UP_ITEM_FROM_SHOP
        ) {
          // HAPPY CASE 6
          this.handleStatusAcceptedToPickUpItemFromShop();
          return;
        }
        if (
          response.data.order.status ===
          ORDER_STATUS.DRIVER_PICKED_UP_ITEM_FROM_SHOP
        ) {
          // HAPPY CASE 7
          this.handleStatusPickedUpItemFromShop(response.data);
          return;
        }
        if (
          response.data.order.status ===
          ORDER_STATUS.DRIVER_DELIVERED_ITEM_TO_CUSTOMER
        ) {
          // HAPPY CASE 8
          this.handleStatusDeliveredItemToCustomer(response.data);
          return;
        }
        if (
          response.data.order.status ===
          ORDER_STATUS.DRIVER_DECLINED_TO_PICKUP_ITEM_FROM_CUSTOMER
        ) {
          this.myGoBack('/tasks');
          return;
        }
        if (
          response.data.order.status ===
          ORDER_STATUS.DRIVER_RETURNED_ITEM_TO_CUSTOMER
        ) {
          this.myGoBack('/tasks');
          return;
        }
        if (
          response.data.order.status ===
          ORDER_STATUS.DRIVER_DECLINED_TO_PICKUP_ITEM_FROM_SHOP
        ) {
          this.myGoBack('/tasks');
          return;
        }
        if (
          response.data.order.status ===
          ORDER_STATUS.DRIVER_RETURNED_ITEM_TO_SHOP
        ) {
          this.myGoBack('/tasks');
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
        this.button2Label = this.getButton2Label(response.data.order.status);
        this.item.status = response.data.order.status;
        this.directionsDisplay.setMap(null);
        this.startMarker?.setMap(null);
        if (
          response.data.order.status ===
          ORDER_STATUS.DRIVER_ASSIGNED_FOR_ITEM_PICKUP
        ) {
          // HAPPY CASE 1
          this.handleStatusAssignedForItemPickup(response.data);
          return;
        }
        if (
          response.data.order.status ===
          ORDER_STATUS.DRIVER_ACCEPTED_TO_PICK_UP_ITEM_FROM_CUSTOMER
        ) {
          // HAPPY CASE 2
          this.handleStatusAcceptedToPickUpItemFromCustomer(response.data);
          return;
        }
        if (
          response.data.order.status ===
          ORDER_STATUS.DRIVER_PICKED_UP_ITEM_FROM_CUSTOMER
        ) {
          // HAPPY CASE 3
          this.handleStatusPickedUpItemFromCustomer();
          return;
        }
        if (
          response.data.order.status ===
          ORDER_STATUS.DRIVER_DELIVERED_ITEM_TO_SHOP
        ) {
          // HAPPY CASE 4
          this.handleStatusDeliveredItemToShop(response.data);
          return;
        }
        if (
          response.data.order.status ===
          ORDER_STATUS.DRIVER_ASSIGNED_FOR_ITEM_DELIVERY
        ) {
          // HAPPY CASE 5
          this.handleStatusAssignedForItemDelivery(response.data);
          return;
        }
        if (
          response.data.order.status ===
          ORDER_STATUS.DRIVER_ACCEPTED_TO_PICK_UP_ITEM_FROM_SHOP
        ) {
          // HAPPY CASE 6
          this.handleStatusAcceptedToPickUpItemFromShop();
          return;
        }
        if (
          response.data.order.status ===
          ORDER_STATUS.DRIVER_PICKED_UP_ITEM_FROM_SHOP
        ) {
          // HAPPY CASE 7
          this.handleStatusPickedUpItemFromShop(response.data);
          return;
        }
        if (
          response.data.order.status ===
          ORDER_STATUS.DRIVER_DELIVERED_ITEM_TO_CUSTOMER
        ) {
          // HAPPY CASE 8
          this.handleStatusDeliveredItemToCustomer(response.data);
          return;
        }
        if (
          response.data.order.status ===
          ORDER_STATUS.DRIVER_DECLINED_TO_PICKUP_ITEM_FROM_CUSTOMER
        ) {
          this.myGoBack('/tasks');
          return;
        }
        if (
          response.data.order.status ===
          ORDER_STATUS.DRIVER_RETURNED_ITEM_TO_CUSTOMER
        ) {
          this.myGoBack('/tasks');
          return;
        }
        if (
          response.data.order.status ===
          ORDER_STATUS.DRIVER_DECLINED_TO_PICKUP_ITEM_FROM_SHOP
        ) {
          this.myGoBack('/tasks');
          return;
        }
        if (
          response.data.order.status ===
          ORDER_STATUS.DRIVER_RETURNED_ITEM_TO_SHOP
        ) {
          this.myGoBack('/tasks');
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

  async showConfirmationModal(
    text: string,
    proceedButtonText: string,
    cancelButtonText: string,
    callBack: () => void
  ) {
    const modalOptions: ModalOptions = {
      component: ConfirmationModal,
      cssClass: 'confirmation-modal',
      componentProps: {
        text: text ?? 'Are You Sure ?',
        proceedButtonText: proceedButtonText ?? 'Yes',
        cancelButtonText: cancelButtonText ?? 'No',
      },
    };
    const ionModalElement = await this.modalController.create(modalOptions);
    await ionModalElement.present();
    const overlayEventDetail = await ionModalElement.onDidDismiss<boolean>();

    const shouldProceed = overlayEventDetail
      ? Boolean(overlayEventDetail.data)
      : false;

    if (shouldProceed) {
      callBack();
    }
  }
}
