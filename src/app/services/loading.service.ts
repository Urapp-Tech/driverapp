import { Injectable, inject } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class LocationService {
  private readonly loadingController = inject(LoadingController);
}
