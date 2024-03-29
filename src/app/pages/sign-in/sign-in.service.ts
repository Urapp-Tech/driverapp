import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATHS } from 'src/environments/API-PATHS';
import { environment } from 'src/environments/environment';
import { SingInPayload, SingInResponse } from '../../types/sign-in.types';

@Injectable()
export class SignInService {
  constructor(private readonly httpClient: HttpClient) {}

  signIn(singInPayload: Omit<SingInPayload, 'tenant'>) {
    const singInPayloadWithTenant = {
      ...singInPayload,
      tenant: environment.tenant,
    };
    return this.httpClient.post<SingInResponse>(
      API_PATHS.login,
      singInPayloadWithTenant
    );
  }
}
