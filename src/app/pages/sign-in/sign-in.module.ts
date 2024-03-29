import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { SignInPageRoutingModule } from './sign-in-routing.module';

import { SignInPage } from './sign-in.page';
import { SignInService } from './sign-in.service';

@NgModule({
  imports: [SharedModule, SignInPageRoutingModule],
  declarations: [SignInPage],
  providers: [SignInService],
})
export class SignInPageModule {}
