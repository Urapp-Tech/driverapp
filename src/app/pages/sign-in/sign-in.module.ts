import { NgModule } from '@angular/core';

import { SignInPageRoutingModule } from './sign-in-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { SignInPage } from './sign-in.page';

@NgModule({
  imports: [SharedModule, SignInPageRoutingModule],
  declarations: [SignInPage],
})
export class SignInPageModule {}
