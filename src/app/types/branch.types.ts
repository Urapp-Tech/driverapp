export type GetBranchesResponse = {
  success: boolean;
  code: number;
  message: string;
  data: BranchesData;
};

export type BranchesData = {
  list: Array<Branch>;
  total: number;
};

export type Branch = {
  id: string;
  tenant: string;
  name: string;
  isActive: boolean;
  isDeleted: boolean;
  createdDate: string;
  updatedDate: string;
  backofficeUser: string;
  createdBy: string;
  updatedBy: string;
  description: null;
  mobile: null;
  landline: null;
  address: string;
};
