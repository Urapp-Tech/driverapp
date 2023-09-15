import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SingInPayload, SingInResponse } from '../../types/sign-in.types';
import { API_PATHS } from 'src/environments/API-PATHS';

@Injectable()
export class SignInService {
  constructor(private readonly httpClient: HttpClient) {}
  signIn(singInPayload: SingInPayload) {
    return this.httpClient.post<SingInResponse>(API_PATHS.login, singInPayload);
  }
}
