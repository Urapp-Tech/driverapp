import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { SetLocationPageRoutingModule } from './set-location-routing.module';

import { SetLocationPage } from './set-location.page';

@NgModule({
  imports: [SharedModule, SetLocationPageRoutingModule],
  declarations: [SetLocationPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SetLocationPageModule {}
