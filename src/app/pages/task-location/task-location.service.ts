import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  GetAssignedOrderDetailsResponse,
  SetOrderStatusPayload,
  SetOrderStatusResponse,
} from 'src/app/types/tasks.types';
import { API_PATHS } from 'src/environments/API-PATHS';

@Injectable()
export class TaskLocationService {
  private readonly httpClient = inject(HttpClient);

  getAssignedOrderDetails(orderId: string) {
    return this.httpClient.get<GetAssignedOrderDetailsResponse>(
      API_PATHS.getAssignedOrderDetails(orderId)
    );
  }

  setOrderStatus(payload: SetOrderStatusPayload) {
    return this.httpClient.post<SetOrderStatusResponse>(
      API_PATHS.setOrderStatus,
      payload
    );
  }
}
