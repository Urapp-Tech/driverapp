/* eslint-disable no-console */

import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { promiseHandler } from '../utilities/promise-handler';

@Injectable({ providedIn: 'root' })
export class LocationService {
  async getCurrentPosition(
    options?: PositionOptions
  ): Promise<[number, number]> {
    const hasRequestPermissions = await Geolocation.requestPermissions();
    console.log(
      `LocationService -> hasRequestPermissions:`,
      hasRequestPermissions
    );

    const hasLocationPermissions = await Geolocation.checkPermissions();
    console.log(
      `LocationService -> hasLocationPermissions:`,
      hasLocationPermissions
    );

    if (hasLocationPermissions.coarseLocation === 'granted') {
      const getCurrentPositionPromise = Geolocation.getCurrentPosition(options);
      const [position, error] = await promiseHandler(getCurrentPositionPromise);
      if (!position) {
        console.error('error :>> ', error);
        return [0, 0];
      }
      return [position.coords.latitude, position.coords.longitude];
    }
    // const hasRequestPermissions = await Geolocation.requestPermissions();
    if (hasRequestPermissions.coarseLocation === 'granted') {
      return this.getCurrentPosition();
    }
    console.error('permission not granted');
    return [0, 0];
  }
}
