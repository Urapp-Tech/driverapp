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
};
