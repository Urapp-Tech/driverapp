import { Component, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NgOtpInputComponent } from 'ng-otp-input';
import { AuthenticationStoreService } from 'src/app/services/auth-store.service';
import { Nullable } from 'src/app/types/common.types';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage {
  constructor(
    private readonly navController: NavController,
    private readonly authenticationStoreService: AuthenticationStoreService
  ) {}

  @ViewChild(NgOtpInputComponent, { static: true })
  ngOtpInput!: NgOtpInputComponent;

  email: Nullable<string> = null;

  otp: string = '';

  config = {
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    allowNumbersOnly: true,
    placeholder: '',
    inputStyles: {
      width: '50px',
      height: '50px',
      background: 'none',
      border: '2px lightgrey solid',
      'border-radius': '8px',
      'font-size': '26px',
      'font-weight': '600',
    },
  };

  ionViewWillEnter() {
    this.email = this.authenticationStoreService.getResetPasswordEmail();
    if (!this.email) {
      this.navController.navigateBack('/forgot-password');
    }
  }

  onOtpChange(otp: string) {
    this.otp = otp;
  }

  onSubmit() {
    if (this.otp.length !== 4) {
      return;
    }
    this.authenticationStoreService.setResetPasswordOTP(this.otp);
    this.navController.navigateForward('/new-password');
  }
}
