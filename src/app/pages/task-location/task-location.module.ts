import { NgModule } from '@angular/core';

import { TaskLocationPageRoutingModule } from './task-location-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { TaskLocationPage } from './task-location.page';

@NgModule({
  imports: [TaskLocationPageRoutingModule, SharedModule],
  declarations: [TaskLocationPage],
})
export class TaskLocationPageModule {}
