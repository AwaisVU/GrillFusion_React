export const MYROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  CART: "/cart",
  CHECKOUT: "/checkout",
  ORDER_CONFIRMATION: "/order-confirmation",
  ORDER_MANAGEMENT: "/order-management",
  MENU_ITEM_MANAGEMENT: "/menu-management",
  MENU_ITEM_DETAILS: "/menu/:id",
};

export const BASE_API_URL = "http://localhost:5177";

export const CATEGORY = ["Burger", "Grill", "Sides", "Drinks"];
export const SPECIAL_TAG = ["Best Seller", "Spicy", "New", "Chef's Choice"];
export const ROLES = {
  CUSTOMER: "Customer",
  ADMIN: "Admin",
};

//For JWT auth slice
export const AUTH_STORAGE_KEYS = {
  TOKEN: "token-grill",
  USER: "user-grill"
}

export const ORDER_STATUS = {
  CONFIRMED: "Confirmed",
  CANCELLED: "Cancelled",
  READY_FOR_PICKUP: "Ready For Pickup",
  COMPLETED: "Completed"
}

export const ORDER_STATUS_OPTIONS = [
  {
    value: ORDER_STATUS.CONFIRMED,
    label: ORDER_STATUS.CONFIRMED,
    color: "warning"
  },
    {
    value: ORDER_STATUS.READY_FOR_PICKUP,
    label: ORDER_STATUS.READY_FOR_PICKUP,
    color: "info"
  },
    {
    value: ORDER_STATUS.COMPLETED,
    label: ORDER_STATUS.COMPLETED,
    color: "success"
  },
    {
    value: ORDER_STATUS.CANCELLED,
    label: ORDER_STATUS.CANCELLED,
    color: "danger"
  },
]