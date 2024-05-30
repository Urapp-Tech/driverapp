import { environment } from './environment';

export const API_PATHS = {
  login() {
    const url = new URL(
      `/api/v1/app/app-user/sign-in/driver`,
      environment.baseURL
    );
    return url.toString();
  },

  forgotPassword() {
    const url = new URL(
      `/api/v1/app/app-user/forgotPassword/driver`,
      environment.baseURL
    );
    return url.toString();
  },

  resetPassword() {
    const url = new URL(
      `/api/v1/app/app-user/resetPassword/driver`,
      environment.baseURL
    );
    return url.toString();
  },

  getAssignedOrders() {
    const url = new URL(
      `/api/v1/app/appOrderDelivery/assignedOrders`,
      environment.baseURL
    );
    return url.toString();
  },

  getAssignedOrderDetails(orderId: string) {
    const url = new URL(
      `/api/v1/app/appOrderDelivery/assignedOrders/${orderId}`,
      environment.baseURL
    );
    return url.toString();
  },

  setOrderStatus() {
    const url = new URL(
      `/api/v1/app/appOrderDelivery/setOrderStatus`,
      environment.baseURL
    );
    return url.toString();
  },
};
