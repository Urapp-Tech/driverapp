import { ORDER_STATUS } from '../utilities/constants';
import { ValueOf } from './common.types';

export type GetAssignedOrdersResponse = {
  success: boolean;
  code: number;
  message: string;
  data: AssignedOrdersData;
};

export type AssignedOrdersData = {
  orders: Array<AssignedOrder>;
  page: number;
  perPage: number;
  totalPages: number;
  totalResults: number;
};

export type OrderStatus = ValueOf<typeof ORDER_STATUS>;

export type AssignedOrder = {
  id: string;
  appUser: AssignedOrderAppUser;
  appOrder: AssignedOrderAppOrder;
  createdDate: string;
  createdBy: string;
  status: OrderStatus;
  pickupDateTime?: string;
  dropDateTime?: string;
  appUserAddress: AssignedOrderAppUserAddress;
};

export type AssignedOrderAppUserAddress = {
  address: string;
};

export type AssignedOrderAppOrder = {
  orderNumber: number;
};

export type AssignedOrderAppUser = {
  phone: string;
};

export type GetAssignedOrderDetailsResponse = {
  success: boolean;
  code: number;
  message: string;
  data: AssignedOrderDetails;
};

export type AssignedOrderDetails = {
  order: AssignedOrder;
};

export type SetOrderStatusPayload = {
  appOrderDelivery: string;
  status: string;
};

export type SetOrderStatusResponse = {
  success: boolean;
  code: number;
  message: string;
  data: AssignedOrderDetails;
};
