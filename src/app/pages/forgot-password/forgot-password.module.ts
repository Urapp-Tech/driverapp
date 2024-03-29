import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ForgotPasswordPageRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordPage } from './forgot-password.page';
import { ForgotPasswordService } from './forgot-password.service';

@NgModule({
  imports: [SharedModule, ForgotPasswordPageRoutingModule],
  declarations: [ForgotPasswordPage],
  providers: [ForgotPasswordService],
})
export class ForgotPasswordPageModule {}
