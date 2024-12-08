import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import Navbar from './components/Layout/Navbar';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import theme from './theme';
import { routes } from './routes/routes';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartToggle = () => {
    setIsCartOpen(prev => !prev);
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AuthProvider>
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
                  {routes.map(route => (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={
                        route.path === '/menu' 
                          ? React.cloneElement(route.element, { 
                              isCartOpen, 
                              setIsCartOpen 
                            })
                          : route.element
                      }
                    />
                  ))}
                </Routes>
              </Box>
            </Box>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;