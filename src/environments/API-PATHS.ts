import { environment } from './environment';

export const API_PATHS = {
  getBranchList(tenantId: string, page = 0, size = 10, search?: string) {
    const url = new URL(
      `/api/v1/app/branch/list/${tenantId}`,
      environment.baseURL
    );
    url.searchParams.append('size', size.toString());
    url.searchParams.append('page', page.toString());
    if (search) url.searchParams.append('search', search);
    return url.toString();
  },

  login() {
    const url = new URL(
      `/api/v1/app/app-user/sign-in/driver`,
      environment.baseURL
    );
    return url.toString();
  },

  createToken() {
    const url = new URL(
      `/api/v1/app/app-user/create/token`,
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

  getSystemConfig(tenantId: string) {
    const url = new URL(
      `/api/v1/system/config/get/${tenantId}`,
      environment.baseURL
    );
    return url.toString();
  },
};
