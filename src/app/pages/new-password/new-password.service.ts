import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from 'src/app/app-config.provider';
import {
  NewPasswordPayload,
  NewPasswordResponse,
} from 'src/app/types/new-password.types';
import { API_PATHS } from 'src/environments/API-PATHS';

@Injectable()
export class NewPasswordService {
  private readonly httpClient = inject(HttpClient);

  constructor(@Inject(APP_CONFIG) private readonly appConfig: AppConfig) {}

  resetPassword(partialNewPasswordPayload: Omit<NewPasswordPayload, 'tenant'>) {
    const forgotPasswordPayload: NewPasswordPayload = {
      ...partialNewPasswordPayload,
      tenant: this.appConfig.TENANT,
    };
    return this.httpClient.post<NewPasswordResponse>(
      API_PATHS.resetPassword,
      forgotPasswordPayload
    );
  }
}
