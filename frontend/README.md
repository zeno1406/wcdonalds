# WcDonald's Frontend

A modern React-based frontend for WcDonald's food ordering system.

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Cart/            # Cart-related components
│   ├── Layout/          # Layout components
│   └── Menu/            # Menu-related components
├── config/              # Configuration files
│   └── constants.js     # App-wide constants
├── context/             # React Context providers
│   ├── AuthContext.jsx  # Authentication context
│   └── CartContext.jsx  # Shopping cart context
├── hooks/               # Custom React hooks
│   └── usePayment.js    # Payment processing hook
├── pages/               # Page components
│   ├── Home.jsx
│   ├── Menu.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   └── PaymentCallback.jsx
├── routes/              # Route configuration
│   └── index.jsx
├── services/            # API and external services
│   └── momoPayment.js   # MoMo payment integration
├── store/               # State management
│   └── index.js
├── utils/               # Utility functions
│   ├── currency.js      # Currency formatting
│   └── validation.js    # Input validation
├── App.jsx              # Root component
└── main.jsx            # Entry point
```

## Features

- User Authentication
- Menu Navigation
- Shopping Cart
- Checkout Process
- Payment Integration (MoMo)
- Responsive Design

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file:
   ```bash
   cp .env.example .env
   ```
   Add your MoMo API credentials to the `.env` file.

3. Start development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## Environment Variables

Required environment variables:

- `REACT_APP_MOMO_PARTNER_CODE` - MoMo Partner Code
- `REACT_APP_MOMO_ACCESS_KEY` - MoMo Access Key
- `REACT_APP_MOMO_SECRET_KEY` - MoMo Secret Key

## Tech Stack

- React
- Material-UI
- React Router
- Context API
- Vite

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
