import { NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';

export const authenticationGuard: CanActivateFn = async () => {
  const userService = inject(UserService);
  const navController = inject(NavController);
  const auth = await userService.isAuth();
  if (auth) {
    return true;
  }
  navController.navigateBack(['/sign-in']);
  return false;
};
