import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { SignInService } from 'src/app/pages/sign-in/sign-in.service';
import { UserService } from 'src/app/services/user.service';
import { SingInPayload, SingInResponse } from 'src/app/types/sign-in.types';

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

  isVisible: boolean = false;

  onEyeClick() {
    this.isVisible = !this.isVisible;
  }

  onLogin(loginForm: NgForm) {
    if (loginForm.form.invalid) {
      return;
    }
    const singInPayload: Omit<SingInPayload, 'tenant'> = {
      email: loginForm.form.controls['email'].value.toLowerCase(),
      password: loginForm.form.controls['password'].value,
    };
    const handleLoginResponse = (response: SingInResponse) => {
      if (response.code === 200) {
        this.userService.setUser(response.data);
        this.navController.navigateRoot('/set-location');
      }
    };
    const handleLoginError = (error: any) => {
      console.log(
        `file: sign-in.page.ts:23 -> SignInPage -> handleLoginError -> error:`,
        error
      );
    };
    this.signInService.signIn(singInPayload).subscribe({
      next: handleLoginResponse,
      error: handleLoginError,
    });
  }
}
