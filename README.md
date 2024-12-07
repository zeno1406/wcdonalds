# WcDonalds POS System

A McDonald's-inspired Point of Sale system built with React, Node.js, and MongoDB.

## Project Structure

```
wcdonalds/
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── store/        # Redux store
│   │   ├── services/     # API services
│   │   └── theme/        # MUI theme
│   └── public/           # Static files
│
└── backend/               # Node.js backend
    ├── src/
    │   ├── controllers/  # Route controllers
    │   ├── models/       # MongoDB models
    │   ├── routes/       # API routes
    │   ├── middleware/   # Custom middleware
    │   └── utils/        # Utility functions
    └── tests/            # Backend tests
```

## Getting Started

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create .env file with your MongoDB URI and JWT secret
4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Features
- Menu Management
- Order Processing
- Shopping Cart
- Admin Dashboard
- Payment Integration
- Order Tracking

## Tech Stack
- Frontend: React, Material-UI, Redux Toolkit
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT
- Deployment: Vercel
