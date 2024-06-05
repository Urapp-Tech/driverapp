const PROTOCOL = 'https';
const DOMAIN = 'dev.urapptech.com';
const PORT = '';

const TransformedPort = PORT ? `:${PORT}` : '';

export const environment = {
  production: true,
  baseURL: `${PROTOCOL}://${DOMAIN}${TransformedPort}`,
  tenantId: '7eabfd5b-12b6-4f0c-acdb-d51a375c3595',
};
