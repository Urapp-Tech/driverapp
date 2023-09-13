import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.page.html',
  styleUrls: ['./track-order.page.scss'],
})
export class TrackOrderPage implements OnInit {
  orders: any = [
    {
      title: 'EZ-45867',
      date: '2023-01-06T17:20:00',
      price: '15.00',
      items: '03',
      type: 'Order In Progress',
      info: 'Your order is in progress',
    },
  ];
  orderTypes = [
    {
      type: 'Order Placed',
      icon: '../assets/icons/icon-bag-check-blue.svg',
      color: '--color-blue',
      percent: 100,
    },
    {
      type: 'Order Pickedup',
      icon: '../assets/icons/icon-boxes.svg',
      color: '--color-purple',
      percent: 100,
    },
    {
      type: 'Order In Progress',
      icon: './assets/icons/icon-location.svg',
      color: '--color-green',
      percent: 100,
    },
    {
      type: 'Order Drop off',
      icon: './assets/icons/icon-time.svg',

      color: '--color-orange',
      percent: 100,
    },
    {
      type: 'Order Delivered',
      icon: './assets/icons/icon-bag-check.svg',

      color: '--color-grey',
      percent: 100,
    },
    {
      type: 'Order Cancelled',
      icon: './assets/icons/icon-bag-close.svg',

      color: '--color-red',
      percent: 100,
    },
  ];

  actions: any = [
    {
      type: 'Order Placed',
      info: 'We have received your order',
      time: '2023-01-06T17:20:00',
    },
    {
      type: 'Order Pickedup',
      info: 'Your order has been collected',
      time: '2023-01-06T17:20:00',
    },
    {
      type: 'Order In Progress',
      info: 'Your order is in progress',
      time: '2023-01-06T17:20:00',
    },
    {
      type: 'Order Drop off',
      info: 'Your order has been dropped',
      time: 'Date, Time',
    },
    {
      type: 'Order Delivered',
      info: 'Your order has been delivered',
      time: 'Date, Time',
    },
    {
      type: 'Order Cancelled',
      info: 'Your order has been cancelled',
      time: 'Date, Time',
    },
  ];
  // List of order types to use for randomly generating a type

  getCssColor(val: any) {
    const cssVars = getComputedStyle(document.documentElement);
  }
  ngOnInit() {
    // List of order types with corresponding icons and colors

    this.mergeInfo(this.orders);
    this.mergeInfo(this.actions);

    // Add corresponding icon and color properties to each order
  }
  mergeInfo(data: any) {
    data.forEach((order: any) => {
      const matchingType: any = this.orderTypes.find(
        (type) => type.type === order.type
      );
      for (const prop in matchingType) {
        order[prop] = matchingType[prop];
      }
    });
  }
}
