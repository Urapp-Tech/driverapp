import { Component } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ORDER_STATUSES } from 'src/app/utilities/constants';
import {
  AssignedOrder,
  GetAssignedOrdersResponse,
} from '../../types/tasks.types';
import { trackById } from '../../utilities/track-by-functions';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage {
  constructor(
    private readonly navController: NavController,
    private readonly tasksService: TasksService
  ) {}

  trackById = trackById;

  ORDER_STATUSES = ORDER_STATUSES;

  assignedOrders: Array<AssignedOrder> = [];

  /* getCssColor(val: any) {
    const cssVars = getComputedStyle(document.documentElement);
  } */

  ionViewWillEnter() {
    // List of order types with corresponding icons and colors
    this.getAssignedOrders();
    // Add corresponding icon and color properties to each order
    this.assignedOrders.forEach((order: any) => {
      const matchingType: any = this.assignedOrders.find(
        (type: any) => type.type === order.status
      );
      Object.keys(matchingType).forEach((key) => {
        // eslint-disable-next-line no-param-reassign
        order[key] = matchingType[key];
      });
    });
  }

  navigateToNextPage(item: AssignedOrder) {
    const navigationExtras: NavigationExtras = {
      replaceUrl: false,
      queryParams: { orderId: item.id },
    };
    this.navController.navigateForward(['/task-location'], navigationExtras);
  }

  getAssignedOrders() {
    const handleResponse = (response: GetAssignedOrdersResponse) => {
      if (response.success) {
        this.assignedOrders = response.data.orders;
      }
    };
    const handleError = (error: any) => {
      console.error('error :>> ', error);
    };
    this.tasksService.getAssignedOrders().subscribe({
      next: handleResponse,
      error: handleError,
    });
  }
}
