import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Nullable } from '../types/common.types';
import { SignInData } from '../types/sign-in.types';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private readonly storageService: StorageService,
    private readonly navController: NavController
  ) {}

  private user: Nullable<SignInData> = null;

  getUser(): Nullable<SignInData> {
    if (this.user) {
      return { ...this.user };
    }
    return null;
  }

  async initialize() {
    const user = await this.storageService.get<SignInData>('USER');
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

  async setUser(user: Nullable<SignInData>) {
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
