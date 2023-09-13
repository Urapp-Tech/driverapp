import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Nullable } from '../types/common.types';
import { SingInData } from '../types/sign-in.types';
import { NavController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private readonly storageService: StorageService,
    private readonly navController: NavController
  ) {}
  private user: Nullable<SingInData> = null;

  getUser(): Nullable<SingInData> {
    if (this.user) {
      return { ...this.user };
    }
    return null;
  }

  async initialize() {
    const user = await this.storageService.get('USER');
    if (user) {
      this.user = user;
      return;
    }
    this.user = null;
  }

  async isAuth() {
    await this.initialize();
    return this.user !== null;
  }

  async setUser(user: Nullable<SingInData>) {
    this.user = user;
    await this.storageService.set('USER', this.user);
  }

  async removeUser() {
    this.user = null;
    await this.storageService.remove('USER');
  }

  async logout() {
    await this.removeUser();
    this.navController.navigateRoot('/');
  }
}
