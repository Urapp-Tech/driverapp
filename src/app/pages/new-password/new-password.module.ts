import { NgModule } from '@angular/core';

import { NewPasswordPageRoutingModule } from './new-password-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { NewPasswordPage } from './new-password.page';
import { NewPasswordService } from './new-password.service';

@NgModule({
  imports: [SharedModule, NewPasswordPageRoutingModule],
  declarations: [NewPasswordPage],
  providers: [NewPasswordService],
})
export class NewPasswordPageModule {}
