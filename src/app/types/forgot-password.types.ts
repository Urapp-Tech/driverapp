export type ForgotPasswordPayload = {
  email: string;
  tenant: string;
};

export type ForgotPasswordResponse = {
  success: boolean;
  code: number;
  message: string;
};
