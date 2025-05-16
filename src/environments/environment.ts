// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/* const PROTOCOL = 'https';
const DOMAIN = 'dev.urapptech.com';
const PORT = ''; */

/* const PROTOCOL = 'http';
const DOMAIN = '192.168.8.68';
const PORT = '3200'; */

const PROTOCOL = 'http';
const DOMAIN = '192.168.8.44';
const PORT = '3300';

const TransformedPort = PORT ? `:${PORT}` : '';

export const environment = {
  production: false,
  baseURL: `${PROTOCOL}://${DOMAIN}${TransformedPort}`,
  tenantId: '2ce2aab8-374b-4371-93bd-a92e5b2bbdd9',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
