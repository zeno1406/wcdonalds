// API Configuration
export const apiConfig = {
  endpoints: {
    MOMO: {
      TEST: 'https://test-payment.momo.vn/v2/gateway/api/create',
      PROD: 'https://payment.momo.vn/v2/gateway/api/create'
    }
  },
  headers: {
    'Content-Type': 'application/json'
  }
};

// Application Routes
export const routes = {
  HOME: '/',
  MENU: '/menu',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ADMIN: '/admin',
  PAYMENT_CALLBACK: '/payment/callback'
};

// Theme Configuration
export const themeConfig = {
  colors: {
    PRIMARY: '#DB0007',
    SECONDARY: '#FFC72C',
    HOVER: {
      PRIMARY: '#C30007',
      SECONDARY: '#FFB700'
    }
  },
  breakpoints: {
    mobile: 'sm',
    tablet: 'md',
    desktop: 'lg'
  }
};

// Storage Keys
export const storageKeys = {
  AUTH_TOKEN: 'wcd_auth_token',
  USER_DATA: 'wcd_user_data',
  CART_ITEMS: 'wcd_cart_items'
};

// Recommended Items Configuration
export const recommendedItemsConfig = {
  checkout: {
    categories: ['Fries & Sides', 'Featured Favorites'],
    maxItems: 3,
    preferredItems: ['French Fries', 'McFlurry', 'Apple Pie']
  },
  cart: {
    categories: ['Featured Favorites'],
    maxItems: 4
  }
};

// Form Validation Rules
export const validationRules = {
  username: {
    required: true,
    minLength: 3,
    maxLength: 20
  },
  password: {
    required: true,
    minLength: 6,
    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  }
};

// Discount Codes
export const discountCodes = {
  WCD10: {
    code: 'WCD10',
    discount: 0.1,
    requiresAuth: true,
    description: '10% off for logged-in users'
  }
};
