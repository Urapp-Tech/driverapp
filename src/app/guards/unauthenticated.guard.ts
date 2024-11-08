import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';

export const unauthenticatedGuard: CanActivateFn = async () => {
  const userService = inject(UserService);
  const navController = inject(NavController);
  const auth = await userService.isAuth();
  if (!auth) {
    return true;
  }
  navController.navigateBack('/set-location');
  return false;
};
