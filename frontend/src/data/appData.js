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
  WELCOME10: {
    code: 'WELCOME10',
    description: 'Welcome discount for new customers',
    discountPercent: 10,
    minOrderValue: 100000,
    maxDiscount: 50000,
    validUntil: '2024-12-31'
  },
  FREESHIP: {
    code: 'FREESHIP',
    description: 'Free shipping on orders over 200k',
    discountAmount: 15000,
    minOrderValue: 200000,
    type: 'shipping',
    validUntil: '2024-12-31'
  },
  SPECIAL20: {
    code: 'SPECIAL20',
    description: 'Special discount for orders over 500k',
    discountPercent: 20,
    minOrderValue: 500000,
    maxDiscount: 200000,
    validUntil: '2024-12-31'
  },
  COMBO50: {
    code: 'COMBO50',
    description: '50k off on combo orders',
    discountAmount: 50000,
    minOrderValue: 300000,
    type: 'fixed',
    validUntil: '2024-12-31'
  }
};
