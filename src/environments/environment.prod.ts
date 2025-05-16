const PROTOCOL = 'https';
const DOMAIN = 'dev.urapptech.com';
const PORT = '';

const TransformedPort = PORT ? `:${PORT}` : '';

export const environment = {
  production: true,
  baseURL: `${PROTOCOL}://${DOMAIN}${TransformedPort}`,
  tenantId: '914b5057-4fe0-408a-bf30-8acf5e7eecc5',
};
