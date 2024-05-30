import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATHS } from 'src/environments/API-PATHS';
import { environment } from 'src/environments/environment';
import { SignInPayload, SignInResponse } from '../../types/sign-in.types';

@Injectable()
export class SignInService {
  constructor(private readonly httpClient: HttpClient) {}

  signIn(signInPayload: Omit<SignInPayload, 'tenant'>) {
    const signInPayloadWithTenant = {
      ...signInPayload,
      tenant: environment.tenantId,
    };
    return this.httpClient.post<SignInResponse>(
      API_PATHS.login(),
      signInPayloadWithTenant
    );
  }
}
