import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgPipesModule } from 'ngx-pipes';
import { HeaderComponent } from '../components/header/header.component';
import { ConfirmationModal } from '../modals/confirmation/confirmation.modal';
import { ColorPipe } from '../pipes/color.pipe';

const components = [HeaderComponent];

const modals = [ConfirmationModal];

const modules = [CommonModule, FormsModule, IonicModule, NgPipesModule];

const pipes = [ColorPipe];

@NgModule({
  declarations: [...components, ...modals, ...pipes],
  exports: [...modules, ...components, ...modals, ...pipes],
  imports: [...modules],
})
export class SharedModule {}
