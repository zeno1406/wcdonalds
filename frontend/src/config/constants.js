// API Endpoints
export const API_ENDPOINTS = {
  MOMO: {
    TEST: 'https://test-payment.momo.vn/v2/gateway/api/create',
    PROD: 'https://payment.momo.vn/v2/gateway/api/create'
  }
};

// Routes
export const ROUTES = {
  HOME: '/',
  MENU: '/menu',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ADMIN: '/admin',
  PAYMENT_CALLBACK: '/payment/callback'
};

// Theme Colors
export const COLORS = {
  PRIMARY: '#DB0007',
  SECONDARY: '#FFC72C',
  HOVER: {
    PRIMARY: '#C30007',
    SECONDARY: '#FFB700'
  }
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'wcd_auth_token',
  CART: 'wcd_cart',
  USER_PREFERENCES: 'wcd_user_prefs'
};

// Payment Methods
export const PAYMENT_METHODS = {
  MOMO: 'momo',
  BANK_TRANSFER: 'bank',
  CASH: 'cash'
};

// Currency
export const CURRENCY = {
  USD: {
    code: 'USD',
    symbol: '$'
  },
  VND: {
    code: 'VND',
    symbol: '₫',
    rate: 23000 // USD to VND conversion rate
  }
};
