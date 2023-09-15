export type NewPasswordPayload = {
  email: string;
  otp: string;
  password: string;
  tenant: string;
};

export type NewPasswordResponse = {
  success: boolean;
  code: number;
  message: string;
};
