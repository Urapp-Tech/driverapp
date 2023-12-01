export const APP_CONFIG = 'APP_CONFIG';
const APP_CONFIG_DATA = {
  TENANT: '9e63e0ed-1b53-4509-bf9c-4768bb7ce35c',
} as const;

export type AppConfig = typeof APP_CONFIG_DATA;

export const APP_CONFIG_TOKEN_INJECTION = {
  provide: APP_CONFIG,
  useValue: APP_CONFIG_DATA,
};
