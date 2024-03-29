import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { TaskLocationPageRoutingModule } from './task-location-routing.module';

import { TaskLocationPage } from './task-location.page';
import { TaskLocationService } from './task-location.service';
import { TaskCardComponent } from './components/task-card.component';

@NgModule({
  imports: [TaskLocationPageRoutingModule, SharedModule],
  declarations: [TaskLocationPage, TaskCardComponent],
  providers: [TaskLocationService],
})
export class TaskLocationPageModule {}
