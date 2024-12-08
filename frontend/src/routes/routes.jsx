import React from 'react';
import Home from '../pages/Home';
import Menu from '../pages/Menu';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Admin from '../pages/Admin';

export const routes = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/menu',
    element: <Menu />
  },
  {
    path: '/cart',
    element: <Cart />
  },
  {
    path: '/checkout',
    element: <Checkout />
  },
  {
    path: '/admin',
    element: <Admin />
  }
];
