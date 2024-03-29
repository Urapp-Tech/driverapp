import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticationStoreService } from 'src/app/services/auth-store.service';
import { ForgotPasswordResponse } from 'src/app/types/forgot-password.types';
import { ForgotPasswordService } from './forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  constructor(
    private readonly navController: NavController,
    private readonly forgotPasswordService: ForgotPasswordService,
    private readonly authenticationStoreService: AuthenticationStoreService
  ) {}

  onForgotPassword(forgotPasswordForm: NgForm) {
    if (forgotPasswordForm.form.invalid) {
      return;
    }
    const email = forgotPasswordForm.form.controls['email'].value.toLowerCase();
    const handleForgotPasswordResponse = (response: ForgotPasswordResponse) => {
      console.log(
        `file: forgot-password.page.ts:27 -> ForgotPasswordPage -> handleForgotPasswordResponse -> response:`,
        response
      );
      if (response.code === 200) {
        this.authenticationStoreService.setResetPasswordEmail(email);
        this.navController.navigateForward('/otp');
      }
    };
    const handleForgotPasswordError = (error: any) => {
      console.log(
        `file: forgot-password.page.ts:36 -> ForgotPasswordPage -> handleForgotPasswordError -> error:`,
        error
      );
    };
    this.forgotPasswordService.forgotPassword(email)?.subscribe({
      next: handleForgotPasswordResponse,
      error: handleForgotPasswordError,
    });
  }
}
