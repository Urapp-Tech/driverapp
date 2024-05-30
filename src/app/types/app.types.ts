export type GetSystemConfigResponse = {
  success: boolean;
  code: number;
  message: string;
  data: SystemConfigData;
};

export type SystemConfigData = {
  id: string;
  tenant: string;
  logoffImage: string;
  createdDate: string;
  theme: Theme;
  domain: string;
  parent: null;
  tenantConfig: TenantConfig;
  banner: Array<Banner>;
};

export type Banner = {
  id: string;
  name: string;
  tenant: string;
  createdBy: string;
  updatedBy: string;
  createdDate: string;
  updatedDate: string;
  isActive: boolean;
  isDeleted: boolean;
  banner: string;
  shortDesc: null | string;
  link: null | string;
  bannerType: string;
  pageDetail: null | string;
  appType: string;
};

export type TenantConfig = {
  id: string;
  name: string;
  desc: string;
  createdBy: string;
  updatedBy: string;
  createdDate: string;
  updatedDate: string;
  logo: string;
  gstPercentage: number;
  email: string;
  minOrderAmount: number;
  deliveryFee: number;
  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
  youtube: string;
  whatsapp: string;
  banner: string;
  shopAddress: string;
  enableLoyaltyProgram: boolean;
  loyaltyCoinConversionRate: number;
  requiredCoinsToRedeem: number;
  minimumDeliveryTime: number;
  deliveryUrgentFees: number;
  theme: string;
  shopSchedule: Array<ShopSchedule>;
  latitude: number;
  longitude: number;
  attendanceDistance: number;
  officeTimeIn: string;
  officeTimeOut: string;
};

export type ShopSchedule = {
  day: string;
  openTime: string;
  breakTime: string;
  closeTime: string;
  breakOffTime: string;
};

export type Theme = {
  id: string;
  key: string;
  value: Value;
  createdDate: string;
};

export type Value = {
  themeColor: ThemeColor;
  categoryColor: Array<string>;
};

export type ThemeColor = {
  faded: string;
  primary: string;
  secondary: string;
  background: string;
  foreground: string;
  secondary2: string;
};
