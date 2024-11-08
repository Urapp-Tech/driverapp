import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BranchService } from 'src/app/services/branch.service';
import { LoadingService } from 'src/app/services/loading.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';
import { Branch, GetBranchesResponse } from 'src/app/types/branch.types';

@Component({
  selector: 'app-select-branch',
  templateUrl: './select-branch.page.html',
  styleUrls: ['./select-branch.page.scss'],
})
export class SelectBranchPage {
  constructor(
    private readonly branchService: BranchService,
    private readonly loadingService: LoadingService,
    private readonly toastService: ToastService,
    private readonly storageService: StorageService,
    private readonly navController: NavController,
    private readonly userService: UserService
  ) {}

  branches: Array<Branch> = [];

  async ionViewWillEnter() {
    await this.storageService.set('IS_BRANCH_SINGLE', false);
    await this.storageService.remove('BRANCH');
    this.getBranchList();
  }

  async setUserToken(branchId: string) {
    const user = this.userService.getUser();
    if (user) {
      const userId = user.id;
      const handleResponse = async (response: any) => {
        await this.loadingService.hide();
        if (response.success) {
          await this.storageService.set('AUTHENTICATION_TOKEN', response.data);
          await this.navController.navigateForward('/set-location');
          return;
        }
        await this.toastService.show(response.message);
      };

      const handleError = async (error: HttpErrorResponse) => {
        await this.loadingService.hide();
        await this.toastService.show(error.message);
      };
      await this.loadingService.show();
      this.userService.createToken(userId, branchId).subscribe({
        next: handleResponse,
        error: handleError,
      });
    }
  }

  async setBranch(branch: Branch) {
    await this.storageService.set('BRANCH', branch);
    this.setUserToken(branch.id);
  }

  async getBranchList(page?: number, size?: number, search?: string) {
    const handleResponse = async (response: GetBranchesResponse) => {
      await this.loadingService.hide();
      if (response.success) {
        if (response.data.list.length === 1) {
          const [branch] = response.data.list;
          await this.storageService.set('IS_BRANCH_SINGLE', true);
          await this.setBranch(branch);
          await this.toastService.show(
            `Only one branch was found. It has been automatically selected.`
          );
          return;
        }
        this.branches = response.data.list;
        return;
      }
      await this.toastService.show(response.message);
    };
    const handleError = async (error: HttpErrorResponse) => {
      await this.loadingService.hide();
      console.log('error :>> ', error);
      await this.toastService.show(error.message);
    };
    await this.loadingService.show();
    this.branchService.getBranchList(page, size, search).subscribe({
      next: handleResponse,
      error: handleError,
    });
  }
}
