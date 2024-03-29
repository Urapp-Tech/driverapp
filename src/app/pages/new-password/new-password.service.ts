import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  NewPasswordPayload,
  NewPasswordResponse,
} from 'src/app/types/new-password.types';
import { API_PATHS } from 'src/environments/API-PATHS';
import { environment } from 'src/environments/environment';

@Injectable()
export class NewPasswordService {
  constructor(private readonly httpClient: HttpClient) {}

  resetPassword(partialNewPasswordPayload: Omit<NewPasswordPayload, 'tenant'>) {
    const forgotPasswordPayload: NewPasswordPayload = {
      ...partialNewPasswordPayload,
      tenant: environment.tenant,
    };
    return this.httpClient.post<NewPasswordResponse>(
      API_PATHS.resetPassword,
      forgotPasswordPayload
    );
  }
}
