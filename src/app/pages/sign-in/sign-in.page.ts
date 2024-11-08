import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { SignInService } from 'src/app/pages/sign-in/sign-in.service';
import { UserService } from 'src/app/services/user.service';
import { SignInPayload, SignInResponse } from 'src/app/types/sign-in.types';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage {
  constructor(
    private readonly signInService: SignInService,
    private readonly navController: NavController,
    private readonly userService: UserService
  ) {}

  isPasswordVisible = false;

  onLogin(loginForm: NgForm) {
    if (loginForm.form.invalid) {
      return;
    }
    const signInPayload: Omit<SignInPayload, 'tenant'> = {
      email: loginForm.form.controls['email'].value.toLowerCase(),
      password: loginForm.form.controls['password'].value,
    };
    const handleLoginResponse = (response: SignInResponse) => {
      if (response.code === 200) {
        this.userService.setUser(response.data);
        this.navController.navigateRoot('/select-branch');
      }
    };
    const handleLoginError = (error: HttpErrorResponse) => {
      console.error('error :>> ', error);
    };
    this.signInService.signIn(signInPayload).subscribe({
      next: handleLoginResponse,
      error: handleLoginError,
    });
  }
}
