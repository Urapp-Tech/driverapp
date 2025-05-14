/* eslint-disable */

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'driver-app',
  webDir: 'www',
  server: {
    allowNavigation: [
      '*.urapptech.com',
      'https://dev.urapptech.com',
      'dev.urapptech.com',
    ],
    cleartext: true,
  },
  android: {
    allowMixedContent: true,
  },
};

export default config;
