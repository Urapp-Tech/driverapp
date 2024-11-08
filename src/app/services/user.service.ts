import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { API_PATHS } from 'src/environments/API-PATHS';
import { environment } from 'src/environments/environment';
import { Nullable } from '../types/common.types';
import { SignInData } from '../types/sign-in.types';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private readonly storageService: StorageService,
    private readonly navController: NavController,
    private readonly httpClient: HttpClient
  ) {}

  private user: Nullable<SignInData> = null;

  private token: Nullable<string> = null;

  getUser(): Nullable<SignInData> {
    if (this.user) {
      return { ...this.user };
    }
    return null;
  }

  getToken() {
    return this.token;
  }

  async initialize() {
    this.user = await this.storageService.get<SignInData>('USER');
    this.token = await this.storageService.get<string>('AUTHENTICATION_TOKEN');
  }

  async isAuth() {
    await this.initialize();
    return Boolean(this.token);
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

  createToken(userId: string, branchId: string) {
    const { tenantId } = environment;
    return this.httpClient.post(API_PATHS.createToken(), {
      user: userId,
      branch: branchId,
      tenant: tenantId,
    });
  }
}
