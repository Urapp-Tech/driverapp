import { Injectable } from '@angular/core';
import { Nullable } from '../types/common.types';

@Injectable({ providedIn: 'root' })
export class AuthenticationStoreService {
  private resetPasswordEmail: Nullable<string> = null;
  getResetPasswordEmail() {
    return this.resetPasswordEmail;
  }
  setResetPasswordEmail(email: Nullable<string>) {
    this.resetPasswordEmail = email;
  }

  private resetPasswordOTP: Nullable<string> = null;
  getResetPasswordOTP() {
    return this.resetPasswordOTP;
  }
  setResetPasswordOTP(otp: Nullable<string>) {
    this.resetPasswordOTP = otp;
  }
}
