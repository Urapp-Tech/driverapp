export const ORDER_STATUS = {
  DRIVER_ASSIGNED_FOR_ITEM_PICKUP: 'Driver-Assigned-For-Item-Pickup',
  DRIVER_ACCEPTED_TO_PICK_UP_ITEM_FROM_CUSTOMER:
    'Driver-Accepted-To-Pick-Up-Item-From-Customer',
  DRIVER_PICKED_UP_ITEM_FROM_CUSTOMER: 'Driver-Picked-Up-Item-From-Customer',
  DRIVER_DELIVERED_ITEM_TO_SHOP: 'Driver-Delivered-Item-To-Shop',
  DRIVER_DECLINED_TO_PICKUP_ITEM_FROM_CUSTOMER:
    'Driver-Declined-To-Pickup-Item-From-Customer',
  DRIVER_RETURNED_ITEM_TO_CUSTOMER: 'Driver-Returned-Item-To-Customer',
  DRIVER_ASSIGNED_FOR_ITEM_DELIVERY: 'Driver-Assigned-For-Item-Delivery',
  DRIVER_ACCEPTED_TO_PICK_UP_ITEM_FROM_SHOP:
    'Driver-Accepted-To-Pick-Up-Item-From-Shop',
  DRIVER_PICKED_UP_ITEM_FROM_SHOP: 'Driver-Picked-Up-Item-From-Shop',
  DRIVER_DELIVERED_ITEM_TO_CUSTOMER: 'Driver-Delivered-Item-To-Customer',
  DRIVER_DECLINED_TO_PICKUP_ITEM_FROM_SHOP:
    'Driver-Declined-To-Pickup-Item-From-Shop',
  DRIVER_RETURNED_ITEM_TO_SHOP: 'Driver-Returned-Item-To-Shop',
} as const;

export const ORDER_STATUSES = new Map([
  [
    ORDER_STATUS.DRIVER_ASSIGNED_FOR_ITEM_PICKUP,
    {
      status: ORDER_STATUS.DRIVER_ASSIGNED_FOR_ITEM_PICKUP,
      title: 'searching A Driver',
      color: '#0ea5e9',
      text: 'searching a suitable driver for item pick up',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 10,
    },
  ],
  [
    ORDER_STATUS.DRIVER_ACCEPTED_TO_PICK_UP_ITEM_FROM_CUSTOMER,
    {
      status: ORDER_STATUS.DRIVER_ACCEPTED_TO_PICK_UP_ITEM_FROM_CUSTOMER,
      title: 'On The Way',
      color: '#0ea5e9',
      text: 'Driver coming to pick your items',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 20,
    },
  ],
  [
    ORDER_STATUS.DRIVER_PICKED_UP_ITEM_FROM_CUSTOMER,
    {
      status: ORDER_STATUS.DRIVER_PICKED_UP_ITEM_FROM_CUSTOMER,
      title: 'Driver Delivering To Shop',
      color: '#3b82f6',
      text: 'driver have received your items',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 30,
    },
  ],
  [
    ORDER_STATUS.DRIVER_DELIVERED_ITEM_TO_SHOP,
    {
      status: ORDER_STATUS.DRIVER_DELIVERED_ITEM_TO_SHOP,
      title: 'Driver Delivered Item To Shop',
      color: '#22c55e',
      text: 'driver have received your items',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 40,
    },
  ],
  [
    ORDER_STATUS.DRIVER_DECLINED_TO_PICKUP_ITEM_FROM_CUSTOMER,
    {
      status: ORDER_STATUS.DRIVER_DECLINED_TO_PICKUP_ITEM_FROM_CUSTOMER,
      title: 'Driver Declined',
      color: '#ef4444',
      text: 'driver declined to pickup item from customer',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 0,
    },
  ],
  [
    ORDER_STATUS.DRIVER_RETURNED_ITEM_TO_CUSTOMER,
    {
      status: ORDER_STATUS.DRIVER_RETURNED_ITEM_TO_CUSTOMER,
      title: 'Driver Returned Item',
      color: '#ef4444',
      text: 'driver has returned item to customer',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 0,
    },
  ],
  [
    ORDER_STATUS.DRIVER_ASSIGNED_FOR_ITEM_DELIVERY,
    {
      status: ORDER_STATUS.DRIVER_ASSIGNED_FOR_ITEM_DELIVERY,
      title: 'searching A Driver',
      color: '#0ea5e9',
      text: 'searching a suitable driver for item delivery',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 50,
    },
  ],
  [
    ORDER_STATUS.DRIVER_ACCEPTED_TO_PICK_UP_ITEM_FROM_SHOP,
    {
      status: ORDER_STATUS.DRIVER_ACCEPTED_TO_PICK_UP_ITEM_FROM_SHOP,
      title: 'On The Way',
      color: '#0ea5e9',
      text: 'Driver coming to pick your items',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 60,
    },
  ],
  [
    ORDER_STATUS.DRIVER_PICKED_UP_ITEM_FROM_SHOP,
    {
      status: ORDER_STATUS.DRIVER_PICKED_UP_ITEM_FROM_SHOP,
      title: 'Items Picked Up',
      color: '#ec4899',
      text: 'Driver is coming to deliver items',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 80,
    },
  ],
  [
    ORDER_STATUS.DRIVER_DELIVERED_ITEM_TO_CUSTOMER,
    {
      status: ORDER_STATUS.DRIVER_DELIVERED_ITEM_TO_CUSTOMER,
      title: 'Delivered',
      color: '#22c55e',
      text: 'driver has delivered items',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 100,
    },
  ],
  [
    ORDER_STATUS.DRIVER_DECLINED_TO_PICKUP_ITEM_FROM_SHOP,
    {
      status: ORDER_STATUS.DRIVER_DECLINED_TO_PICKUP_ITEM_FROM_SHOP,
      title: 'Driver Declined',
      color: '#ef4444',
      text: 'driver declined to pickup item from shop',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 40,
    },
  ],
  [
    ORDER_STATUS.DRIVER_RETURNED_ITEM_TO_SHOP,
    {
      status: ORDER_STATUS.DRIVER_RETURNED_ITEM_TO_SHOP,
      title: 'Driver Returned Item',
      color: '#ef4444',
      text: 'driver has returned item to shop',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 40,
    },
  ],
]);
