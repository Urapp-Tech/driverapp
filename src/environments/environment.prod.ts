const PROTOCOL = 'https';
const DOMAIN = 'dev.urapptech.com';
const PORT = '';

const TransformedPort = PORT ? `:${PORT}` : '';

export const environment = {
  production: true,
  baseURL: `${PROTOCOL}://${DOMAIN}${TransformedPort}`,
  tenant: '30f155f2-ded0-4fc2-897c-87dae511faf8',
};
