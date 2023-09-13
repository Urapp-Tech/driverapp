import { NgModule } from '@angular/core';

import { TasksPageRoutingModule } from './tasks-routing.module';

import { NgCircleProgressModule } from 'ng-circle-progress';
import { SharedModule } from '../../shared/shared.module';
import { TasksPage } from './tasks.page';

@NgModule({
  imports: [
    TasksPageRoutingModule,
    SharedModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      backgroundPadding: 7,
      radius: 60,
      space: -2,
      maxPercent: 100,
      outerStrokeWidth: 2,
      outerStrokeColor: '#808080',
      innerStrokeColor: '#e7e8ea',
      innerStrokeWidth: 2,
      animationDuration: 1000,
      showTitle: false,
      showSubtitle: false,
      showUnits: false,
      showBackground: false,
      showImage: true,
      imageHeight: 20,
      imageWidth: 20,
      responsive: true,
      // "imageSrc": 'data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="512" height="512" viewBox="0 0 512 512"%3E%3Cpath fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 48c-79.5 0-144 61.39-144 137c0 87 96 224.87 131.25 272.49a15.77 15.77 0 0 0 25.5 0C304 409.89 400 272.07 400 185c0-75.61-64.5-137-144-137Z"%2F%3E%3Ccircle cx="256" cy="192" r="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"%2F%3E%3C%2Fsvg%3E'
    }),
  ],
  declarations: [TasksPage],
})
export class TasksPageModule {}
