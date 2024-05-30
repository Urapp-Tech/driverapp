export type SignInPayload = {
  email: string;
  password: string;
  tenant: string;
};

export type SignInResponse = {
  success: boolean;
  code: number;
  message: string;
  data: SignInData;
};

export type SignInData = {
  id: string;
  email: string;
  isActive: boolean;
  createdDate: string;
  updatedDate: string;
  tenant: string;
  phone: string;
  firstName: string;
  lastName: string;
  postalCode: string;
  userType: string;
  token: string;
};
