import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';

export const authenticationGuard: CanActivateFn = async () => {
  const userService = inject(UserService);
  const navController = inject(NavController);
  const auth = await userService.isAuth();
  console.log('auth :>> ', auth);
  if (auth) {
    return true;
  }
  navController.navigateBack(['/sign-in']);
  return false;
};
