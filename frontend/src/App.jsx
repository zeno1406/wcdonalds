import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Navbar from './components/Layout/Navbar';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { CartProvider } from './context/CartContext';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartToggle = () => {
    setIsCartOpen(prev => !prev);
  };

  return (
    <Router>
      <CartProvider>
        <CssBaseline />
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          minHeight: '100vh'
        }}>
          <Navbar onCartClick={handleCartToggle} />
          <Box component="main" sx={{ 
            flexGrow: 1,
            pt: '64px', // height of AppBar
          }}>
            <Routes>
              {/* Redirect root path to menu */}
              <Route path="/" element={<Navigate to="/menu" replace />} />
              <Route 
                path="/menu" 
                element={
                  <Menu 
                    isCartOpen={isCartOpen} 
                    setIsCartOpen={setIsCartOpen}
                  />
                } 
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </Box>
        </Box>
      </CartProvider>
    </Router>
  );
}

export default App;
