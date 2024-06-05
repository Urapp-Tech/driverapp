import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.modal.html',
  styleUrls: ['./confirmation.modal.scss'],
})
export class ConfirmationModal {
  constructor(private readonly modalController: ModalController) {}

  @Input() text = '';

  @Input() proceedButtonText = '';

  @Input() cancelButtonText = '';

  async onBackDropClicked(event: MouseEvent) {
    event.stopPropagation();
    await this.modalController.dismiss(false);
  }

  async onContentClicked(event: MouseEvent) {
    event.stopPropagation();
  }

  async proceed(event: MouseEvent) {
    event.stopPropagation();
    await this.modalController.dismiss(true);
  }

  async cancel(event: MouseEvent) {
    event.stopPropagation();
    await this.modalController.dismiss(false);
  }
}
