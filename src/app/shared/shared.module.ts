import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPipe } from '../pipes/color.pipe';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ColorPipe],
  exports: [CommonModule, FormsModule, IonicModule, ColorPipe],
})
export class SharedModule {}
