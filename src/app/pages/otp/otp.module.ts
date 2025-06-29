import { NgModule } from '@angular/core';

import { NgOtpInputModule } from 'ng-otp-input';
import { SharedModule } from 'src/app/shared/shared.module';
import { OtpPageRoutingModule } from './otp-routing.module';

import { OtpPage } from './otp.page';

@NgModule({
  imports: [SharedModule, OtpPageRoutingModule, NgOtpInputModule],
  declarations: [OtpPage],
})
export class OtpPageModule {}
