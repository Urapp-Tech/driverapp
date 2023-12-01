import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_PATHS } from 'src/environments/API-PATHS';
import { GetAssignedOrdersResponse } from '../../types/tasks.types';

@Injectable()
export class TasksService {
  private readonly httpClient = inject(HttpClient);

  getAssignedOrders() {
    return this.httpClient.get<GetAssignedOrdersResponse>(
      API_PATHS.getAssignedOrders
    );
  }
}
