import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  GetAssignedOrderDetailsResponse,
  SetOrderStatusPayload,
  SetOrderStatusResponse,
} from 'src/app/types/tasks.types';
import { API_PATHS } from 'src/environments/API-PATHS';

@Injectable()
export class TaskLocationService {
  constructor(private readonly httpClient: HttpClient) {}

  getAssignedOrderDetails(orderId: string) {
    return this.httpClient.get<GetAssignedOrderDetailsResponse>(
      API_PATHS.getAssignedOrderDetails(orderId)
    );
  }

  setOrderStatus(payload: SetOrderStatusPayload) {
    return this.httpClient.post<SetOrderStatusResponse>(
      API_PATHS.setOrderStatus(),
      payload
    );
  }
}
