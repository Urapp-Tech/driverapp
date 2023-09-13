import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  constructor(
    private navCtrl: NavController,
    private router: Router
  ) {}

  /* orders:any = [
    {
      orderId: "EZ-1345",
      phone: "+1 54 523 5478",
      status: "Picked",
      time: "8:00 AM - 9:00 PM",
      address: "1600 Amphitheatre Parkway, Mountain View, CA 94043, USA",
      lat: 37.4219955,
      lng: -122.0842465,
      title: "Google Campus Delivery"
    },
    {
      orderId: "EZ-2234",
      phone: "+1 54 523 5478",
      status: "Drop Off",
      time: "11:00 AM - 10:00 PM",
      address: "1 Apple Park Way, Cupertino, CA 95014, USA",
      lat: 37.3316749,
      lng: -122.0309443,
      title: "Apple Inc. Delivery"
    },
    {
      orderId: "EZ-3231",
      phone: "+1 54 523 5478",
      status: "Pickup",
      time: "8:00 AM - 9:00 PM",
      address: "160 Spear St 1200, San Francisco, CA 94105, USA",
      lat: 37.7917077,
      lng: -122.3934056,
      title: "San Francisco Pickup"
    },
    {
      orderId: "EZ-6344",
      phone: "+1 54 523 5478",
      status: "Dropped",
      time: "8:00 AM - 9:00 PM",
      address: "160 Spear St 1200, San Francisco, CA 94105, USA",
      lat: 37.7917077,
      lng: -122.3934056,
      title: "San Francisco Drop-off"
    },
    {
      orderId: "EZ-4323",
      phone: "+1 54 523 5478",
      status: "Drop Off",
      time: "11:00 AM - 10:00 PM",
      address: "701 First Ave, Sunnyvale, CA 94089, USA",
      lat: 37.410924,
      lng: -122.015801,
      title: "Sunnyvale Delivery"
    }
  ]; */

  orders: any = [
    {
      orderId: 'EZ-1345',
      phone: '+1 54 523 5478',
      status: 'Picked',
      time: '8:00 AM - 9:00 PM',
      address:
        'Plot D, 27 Gizri Rd, Block 9 Clifton, Karachi, Karachi City, Sindh 75600, Pakistan',
      title: 'Karachi Delivery 1',
      location: {
        lat: 24.862114,
        lng: 67.064683,
      },
    },
    {
      orderId: 'EZ-2234',
      phone: '+1 54 523 5478',
      status: 'Drop Off',
      time: '11:00 AM - 10:00 PM',
      address: 'Clifton Block 9, Karachi',
      title: 'Karachi Delivery 2',
      location: {
        lat: 24.817928,
        lng: 67.038286,
      },
    },
    {
      orderId: 'EZ-3231',
      phone: '+1 54 523 5478',
      status: 'Pickup',
      time: '8:00 AM - 9:00 PM',
      address: 'Dilkushan Forum Tariq Road, Karachi',
      title: 'Karachi Pickup 1',
      location: {
        lat: 24.869223,
        lng: 67.047135,
      },
    },
    {
      orderId: 'EZ-6344',
      phone: '+1 54 523 5478',
      status: 'Dropped',
      time: '8:00 AM - 9:00 PM',
      address: 'Burns road, Waheed Kabab',
      title: 'Karachi Drop-off 1',
      location: {
        lat: 24.952467,
        lng: 67.046345,
      },
    },
    {
      orderId: 'EZ-4323',
      phone: '+1 54 523 5478',
      status: 'Drop Off',
      time: '11:00 AM - 10:00 PM',
      address: 'Rock Heaven apartment, Clifton',
      title: 'Karachi Delivery 3',
      location: {
        lat: 24.819426,
        lng: 67.055372,
      },
    },
  ];

  orderTypes = [
    {
      type: 'Pickup',
      icon: '../assets/icons/icon-bag-check-blue.svg',
      color: '--color-purple',
      percent: 25,
    },
    {
      type: 'Picked',
      icon: '../assets/icons/icon-boxes.svg',
      color: '--color-green',
      percent: 50,
    },
    {
      type: 'Dropped',
      icon: './assets/icons/icon-location.svg',
      color: '--color-green',
      percent: 75,
    },
    {
      type: 'Drop Off',
      icon: './assets/icons/icon-time.svg',
      color: '--color-orange',
      percent: 100,
    },
    {
      type: 'Delivered',
      icon: './assets/icons/icon-bag-check.svg',
      color: '--color-grey',
      percent: 100,
    },
    {
      type: 'Cancelled',
      icon: './assets/icons/icon-bag-close.svg',

      color: '--color-red',
      percent: 100,
    },
  ];
  // List of order types to use for randomly generating a type

  getCssColor(val: any) {
    const cssVars = getComputedStyle(document.documentElement);
  }
  ngOnInit() {
    // List of order types with corresponding icons and colors

    // Add corresponding icon and color properties to each order
    this.orders.forEach((order: any) => {
      const matchingType: any = this.orderTypes.find(
        (type: any) => type.type === order.status
      );
      for (let prop in matchingType) {
        order[prop] = matchingType[prop];
      }
    });
  }
  navigateToNextPage(item: any) {
    const navigationExtras: NavigationExtras = {
      replaceUrl: false,
      state: {
        item: item,
      },
    };
    // this.navCtrl.navigateForward('/set-location', navigationExtras);
    console.log(item);
    this.router.navigate(['/task-location'], {
      replaceUrl: false,
      state: { item: item },
    });
  }
}
