import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  useTheme, 
  useMediaQuery 
} from '@mui/material';
import CategoryTabs from '../components/Menu/CategoryTabs';
import ProductCard from '../components/Menu/ProductCard';
import CartDrawer from '../components/Cart/CartDrawer';
import Navbar from '../components/Layout/Navbar';
import { useCart } from '../context/CartContext';
import { menuData } from '../data/menuData';
import Chat from '../components/Chat/Chat';

const Menu = () => {
  const categories = Object.keys(menuData);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems } = useCart();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const menuContainerRef = useRef(null);

  // Create refs for each category section
  const categoryRefs = categories.reduce((acc, category) => {
    acc[category] = useRef(null);
    return acc;
  }, {});

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    
    // Scroll to the category section
    if (categoryRefs[category] && categoryRefs[category].current) {
      categoryRefs[category].current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Intersection Observer to update selected category on scroll
  useEffect(() => {
    // Only run for mobile view
    if (!isDesktop) {
      const observerOptions = {
        root: menuContainerRef.current,
        rootMargin: '0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0.1) {
            const category = entry.target.getAttribute('data-category');
            setSelectedCategory(category);
          }
        });
      }, observerOptions);

      // Observe all category sections
      Object.values(categoryRefs).forEach(ref => {
        if (ref.current) observer.observe(ref.current);
      });

      return () => {
        Object.values(categoryRefs).forEach(ref => {
          if (ref.current) observer.unobserve(ref.current);
        });
      };
    }
  }, [isDesktop, categoryRefs]);

  // Desktop Intersection Observer
  useEffect(() => {
    if (isDesktop) {
      const observerOptions = {
        root: menuContainerRef.current,
        rootMargin: '0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0.1) {
            const category = entry.target.getAttribute('data-category');
            setSelectedCategory(category);
          }
        });
      }, observerOptions);

      // Observe all category sections
      Object.values(categoryRefs).forEach(ref => {
        if (ref.current) observer.observe(ref.current);
      });

      return () => {
        Object.values(categoryRefs).forEach(ref => {
          if (ref.current) observer.unobserve(ref.current);
        });
      };
    }
  }, [isDesktop, categoryRefs]);

  return (
    <Box>
      <Navbar onCartToggle={toggleCart} />
      
      <Box sx={{ 
        display: 'flex',
        minHeight: 'calc(100vh - 64px)',
        flexDirection: isDesktop ? 'row' : 'column',
        pt: !isDesktop ? '48px' : 0
      }}>
        {/* Desktop Categories Navigation */}
        {isDesktop && (
          <CategoryTabs
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            categoryRefs={categoryRefs}
          />
        )}
        
        {/* Menu Content with Infinite Scroll */}
        <Box 
          ref={menuContainerRef}
          sx={{ 
            flexGrow: 1,
            p: 3,
            bgcolor: '#f5f5f5',
            width: isDesktop && isCartOpen 
              ? 'calc(100% - 280px - 30%)' 
              : isDesktop 
                ? '100%' 
                : '100%',
            overflowY: 'auto',
            maxHeight: 'calc(100vh - 64px)'
          }}
        >
          <Container maxWidth="lg">
            {/* Mobile Category Tabs */}
            {!isDesktop && (
              <CategoryTabs
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                categoryRefs={categoryRefs}
              />
            )}

            {/* Infinite Scroll Menu Sections */}
            {categories.map((category) => (
              <Box 
                key={category}
                ref={categoryRefs[category]}
                data-category={category}
                sx={{ 
                  mb: 4, 
                  scrollMarginTop: '64px' 
                }}
              >
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 2, 
                    fontWeight: 'bold', 
                    color: 'text.primary' 
                  }}
                >
                  {category}
                </Typography>
                <Grid container spacing={3}>
                  {menuData[category].map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                      <ProductCard product={product} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ))}
          </Container>
        </Box>

        {/* Cart Drawer */}
        {isDesktop ? (
          isCartOpen && (
            <Box 
              data-cart-container="true"
              sx={{ 
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
                onClose={() => setIsCartOpen(false)}
                cartItems={cartItems}
              />
            </Box>
          )
        ) : (
          <CartDrawer
            open={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cartItems}
          />
        )}
      </Box>
      <Chat />
    </Box>
  );
};

export default Menu;