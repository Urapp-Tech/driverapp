import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetBranchesResponse } from 'src/app/types/branch.types';
import { API_PATHS } from 'src/environments/API-PATHS';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  constructor(private readonly httpClient: HttpClient) {}

  getBranchList(page?: number, size?: number, search?: string) {
    const { tenantId } = environment;
    return this.httpClient.get<GetBranchesResponse>(
      API_PATHS.getBranchList(tenantId, page, size, search)
    );
  }
}
