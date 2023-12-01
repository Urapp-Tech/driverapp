import { environment } from './environment';

export const API_PATHS = {
  login: new URL(
    `/api/v1/app/app-user/sign-in/driver`,
    environment.baseUrl
  ).toString(),
  forgotPassword: new URL(
    `/api/v1/app/app-user/forgotPassword/driver`,
    environment.baseUrl
  ).toString(),
  resetPassword: new URL(
    `/api/v1/app/app-user/resetPassword/driver`,
    environment.baseUrl
  ).toString(),
  getAssignedOrders: new URL(
    `/api/v1/app/appOrderDelivery/assignedOrders`,
    environment.baseUrl
  ).toString(),
  getAssignedOrderDetails: (orderId: string) =>
    new URL(
      `/api/v1/app/appOrderDelivery/assignedOrders/${orderId}`,
      environment.baseUrl
    ).toString(),

  setOrderStatus: new URL(
    `/api/v1/app/appOrderDelivery/setOrderStatus`,
    environment.baseUrl
  ).toString(),
};
