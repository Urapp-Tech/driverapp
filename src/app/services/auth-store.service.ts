import { Injectable } from '@angular/core';
import { Nullable } from '../types/common.types';

@Injectable({ providedIn: 'root' })
export class AuthenticationStoreService {
  private resetPasswordEmail: Nullable<string> = null;

  private resetPasswordOTP: Nullable<string> = null;

  getResetPasswordEmail() {
    return this.resetPasswordEmail;
  }

  getResetPasswordOTP() {
    return this.resetPasswordOTP;
  }

  setResetPasswordEmail(email: Nullable<string>) {
    this.resetPasswordEmail = email;
  }

  setResetPasswordOTP(otp: Nullable<string>) {
    this.resetPasswordOTP = otp;
  }
}
