import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticationStoreService } from 'src/app/services/auth-store.service';
import { ToastService } from 'src/app/services/toast.service';
import { Nullable } from 'src/app/types/common.types';
import {
  NewPasswordPayload,
  NewPasswordResponse,
} from 'src/app/types/new-password.types';
import { NewPasswordService } from './new-password.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.page.html',
  styleUrls: ['./new-password.page.scss'],
})
export class NewPasswordPage {
  private readonly authenticationStoreService = inject(
    AuthenticationStoreService
  );
  private readonly navController = inject(NavController);
  private readonly newPasswordService = inject(NewPasswordService);
  private readonly toastService = inject(ToastService);
  email: Nullable<string> = null;
  otp: Nullable<string> = null;

  newPassword: string = '';
  confirmPassword: string = '';

  newPasswordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;

  toggleNewPasswordVisibility() {
    this.newPasswordVisible = !this.newPasswordVisible;
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }

  ionViewWillEnter() {
    this.email = this.authenticationStoreService.getResetPasswordEmail();
    this.otp = this.authenticationStoreService.getResetPasswordOTP();
    if (!this.email || !this.otp) {
      this.navController.navigateBack('/forgot-password');
    }
  }

  onResetPassword(resetPasswordForm: NgForm) {
    if (resetPasswordForm.form.invalid) {
      return;
    }
    const newPassword: string =
      resetPasswordForm.form.controls['newPassword'].value;
    const confirmPassword: string =
      resetPasswordForm.form.controls['confirmPassword'].value;
    if (newPassword !== confirmPassword) {
      this.toastService.show('Password Does Not Match');
      return;
    }
    const partialNewPasswordPayload: Omit<NewPasswordPayload, 'tenant'> = {
      email: this.email as string,
      otp: this.otp as string,
      password: newPassword,
    };
    const handleForgotPasswordResponse = (response: NewPasswordResponse) => {
      console.log(
        `file: new-password.page.ts:59 -> NewPasswordPage -> handleForgotPasswordResponse -> response:`,
        response
      );
      if (response.code === 200) {
        this.navController.navigateForward('/sign-in');
      }
    };
    const handleForgotPasswordError = (error: any) => {
      console.log(
        `file: new-password.page.ts:68 -> NewPasswordPage -> handleForgotPasswordError -> error:`,
        error
      );
    };
    this.newPasswordService.resetPassword(partialNewPasswordPayload).subscribe({
      next: handleForgotPasswordResponse,
      error: handleForgotPasswordError,
    });
  }
}
