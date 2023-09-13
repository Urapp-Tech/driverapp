import { environment } from './environment';

export const API_PATHS = {
  login: new URL(
    `/api/v1/app/app-user/sign-in/app`,
    environment.baseUrl
  ).toString(),
} as const;
