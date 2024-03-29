import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
} from 'src/app/types/forgot-password.types';
import { API_PATHS } from 'src/environments/API-PATHS';
import { environment } from 'src/environments/environment';

@Injectable()
export class ForgotPasswordService {
  constructor(private readonly httpClient: HttpClient) {}

  forgotPassword(email: string) {
    const forgotPasswordPayload: ForgotPasswordPayload = {
      email,
      tenant: environment.tenant,
    };
    return this.httpClient.post<ForgotPasswordResponse>(
      API_PATHS.forgotPassword,
      forgotPasswordPayload
    );
  }
}
