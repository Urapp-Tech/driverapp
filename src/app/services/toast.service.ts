import { Injectable } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private readonly toastController: ToastController) {}

  private toasts: Array<HTMLIonToastElement> = [];

  private isPresenting = false;

  async show(
    message: string,
    duration = 2000,
    header = '',
    position: 'top' | 'bottom' | 'middle' | undefined = 'top'
  ) {
    const toastOptions: ToastOptions = {
      message,
      duration,
      header,
      position,
    };
    const toast = await this.toastController.create(toastOptions);
    this.toasts.push(toast);

    if (this.isPresenting) {
      return;
    }

    this.processToastQueue();
  }

  private async processToastQueue() {
    if (this.toasts.length > 0) {
      const toast = this.toasts.shift();
      if (toast) {
        this.isPresenting = true;
        await toast.present();
        await toast.onDidDismiss();
        this.isPresenting = false;
        this.processToastQueue();
      }
    }
  }
}
