import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';
import { ColorPipe } from '../pipes/color.pipe';

@NgModule({
  declarations: [ColorPipe],
  exports: [CommonModule, FormsModule, IonicModule, ColorPipe, NgPipesModule],
})
export class SharedModule {}
