import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SelectBranchPageRoutingModule } from './select-branch-routing.module';
import { SelectBranchPage } from './select-branch.page';

@NgModule({
  imports: [SharedModule, SelectBranchPageRoutingModule],
  declarations: [SelectBranchPage],
})
export class SelectBranchPageModule {}
