import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG, AppConfig } from 'src/app/app-config.provider';
import {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
} from 'src/app/types/forgot-password.types';
import { API_PATHS } from 'src/environments/API-PATHS';

@Injectable()
export class ForgotPasswordService {
  constructor(
    private readonly httpClient: HttpClient,
    @Inject(APP_CONFIG) private readonly appConfig: AppConfig
  ) {}
  forgotPassword(email: string) {
    const forgotPasswordPayload: ForgotPasswordPayload = {
      email: email,
      tenant: this.appConfig.TENANT,
    };
    return this.httpClient.post<ForgotPasswordResponse>(
      API_PATHS.forgotPassword,
      forgotPasswordPayload
    );
  }
}
