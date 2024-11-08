import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectBranchPage } from './select-branch.page';

const routes: Routes = [
  {
    path: '',
    component: SelectBranchPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectBranchPageRoutingModule {}
