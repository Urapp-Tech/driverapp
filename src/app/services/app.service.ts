import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATHS } from 'src/environments/API-PATHS';
import { environment } from 'src/environments/environment';
import { GetSystemConfigResponse } from '../types/app.types';

@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(private readonly httpClient: HttpClient) {}

  getSystemConfig() {
    const { tenantId } = environment;
    return this.httpClient.get<GetSystemConfigResponse>(
      API_PATHS.getSystemConfig(tenantId)
    );
  }
}
