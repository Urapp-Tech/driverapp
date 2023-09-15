import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private readonly toastController: ToastController) {}
  async show(message: string) {
    const loading = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
    });
    await loading.present();
  }
}
