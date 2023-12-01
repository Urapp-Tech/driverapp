/* eslint-disable @typescript-eslint/no-explicit-any */

import { UrlTree } from '@angular/router';
import { IonRouterOutlet, NavController } from '@ionic/angular';

type GoBackConfig = {
  ionRouterOutlet: IonRouterOutlet;
  navController: NavController;
};

export function ionGoBack(config: GoBackConfig) {
  return function (defaultHref?: string | any[] | UrlTree) {
    const canGoBack = config.ionRouterOutlet.canGoBack();
    if (canGoBack) {
      return config.navController.pop();
    }
    if (defaultHref) {
      return config.navController.navigateBack(defaultHref);
    }
    return config.navController.navigateBack('/');
  };
}
