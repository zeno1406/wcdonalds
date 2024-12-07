import { Box, Container, Grid, useTheme, useMediaQuery } from '@mui/material';
import CategoryTabs from '../components/Menu/CategoryTabs';
import ProductCard from '../components/Menu/ProductCard';
import CartDrawer from '../components/Cart/CartDrawer';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { menuData } from '../data/menuData';

const Menu = () => {
  const categories = Object.keys(menuData);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems } = useCart();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <Box>
      {/* Mobile Layout */}
      {!isDesktop && (
        <Box sx={{ width: '100%', position: 'sticky', top: 64, zIndex: 1, bgcolor: 'background.paper' }}>
          <CategoryTabs
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </Box>
      )}

      <Box sx={{ 
        display: 'flex',
        minHeight: 'calc(100vh - 64px)',
        flexDirection: isDesktop ? 'row' : 'column',
        pt: !isDesktop ? '48px' : 0 // Add padding for mobile to account for tabs
      }}>
        {/* Desktop Categories */}
        {isDesktop && (
          <CategoryTabs
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        )}
        
        {/* Menu Content */}
        <Box sx={{ 
          flexGrow: 1,
          p: 3,
          bgcolor: '#f5f5f5',
          width: isDesktop ? 'calc(100% - 280px - 30%)' : '100%' // Subtract cart width
        }}>
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              {menuData[selectedCategory].map((product) => (
                <Grid item xs={12} sm={6} md={3} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Cart - Always visible on desktop */}
        {isDesktop ? (
          <Box sx={{ 
            width: '30%', 
            height: 'calc(100vh - 64px)',
            position: 'fixed',
            right: 0,
            top: 64,
            bgcolor: 'background.paper',
            borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
            overflow: 'auto'
          }}>
            <CartDrawer
              open={true}
              onClose={() => {}}
              cartItems={cartItems}
            />
          </Box>
        ) : (
          <CartDrawer
            open={isCartOpen}
            onClose={toggleCart}
            cartItems={cartItems}
          />
        )}
      </Box>
    </Box>
  );
};

export default Menu;
