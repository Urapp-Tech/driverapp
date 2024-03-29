import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATHS } from 'src/environments/API-PATHS';
import { GetAssignedOrdersResponse } from '../../types/tasks.types';

@Injectable()
export class TasksService {
  constructor(private readonly httpClient: HttpClient) {}

  getAssignedOrders() {
    return this.httpClient.get<GetAssignedOrdersResponse>(
      API_PATHS.getAssignedOrders
    );
  }
}
