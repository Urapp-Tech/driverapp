export type SingInPayload = {
  email: string;
  password: string;
  tenant: string;
};

export type SingInResponse = {
  success: boolean;
  code: number;
  message: string;
  data: SingInData;
};

export type SingInData = {
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
