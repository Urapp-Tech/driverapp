import { Injectable, inject } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly toastController = inject(ToastController);
  async show(message: string) {
    const loading = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
    });
    await loading.present();
  }
}
