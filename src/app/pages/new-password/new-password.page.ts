import { Component } from '@angular/core';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.page.html',
  styleUrls: ['./new-password.page.scss'],
})
export class NewPasswordPage {
  newPassword: string = '';
  confirmPassword: string = '';

  newPasswordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;

  newPassEyeIcon = 'eye';
  confirmPassEyeIcon = 'eye';

  toggleNewPasswordVisibility() {
    this.newPasswordVisible = !this.newPasswordVisible;
    this.newPassEyeIcon = this.newPassEyeIcon != 'eye' ? 'eye' : 'eye-off';
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
    this.confirmPassEyeIcon =
      this.confirmPassEyeIcon != 'eye' ? 'eye' : 'eye-off';
  }

  get newPasswordType(): string {
    return this.newPasswordVisible ? 'text' : 'password';
  }

  get confirmPasswordType(): string {
    return this.confirmPasswordVisible ? 'text' : 'password';
  }

  onSave() {
    // TODO: Validate the passwords and perform the appropriate action
  }
}
