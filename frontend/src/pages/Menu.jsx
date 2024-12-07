import { Box, Container } from '@mui/material';
import CategoryTabs from '../components/Menu/CategoryTabs';
import ProductCard from '../components/Menu/ProductCard';
import CartDrawer from '../components/Cart/CartDrawer';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

const Menu = () => {
  const categories = ['BURGERS', 'CHICKEN & SANDWICHES', 'BEVERAGES', 'DESSERTS', 'SIDES'];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems } = useCart();

  // Mock products data
  const products = {
    'BURGERS': [
      {
        id: 1,
        name: 'Big Wac',
        description: 'Double beef patties with special sauce, lettuce, cheese, pickles, onions on a sesame seed bun',
        price: 5.99,
        image: 'https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Big-Mac-1:1-4-product-tile-desktop',
        category: 'BURGERS'
      },
      {
        id: 2,
        name: 'Quarter Pounder',
        description: 'Fresh beef patty with cheese, onions, pickles, and condiments',
        price: 4.99,
        image: 'https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Quarter-Pounder-with-Cheese-1:1-4-product-tile-desktop',
        category: 'BURGERS'
      },
    ],
    'CHICKEN & SANDWICHES': [
      {
        id: 3,
        name: 'Crispy Chicken Sandwich',
        description: 'Crispy chicken fillet with pickles and mayo on a toasted bun',
        price: 4.99,
        image: 'https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-crispy-chicken-sandwich:1-4-product-tile-desktop',
        category: 'CHICKEN & SANDWICHES'
      },
      {
        id: 4,
        name: 'Spicy Chicken Sandwich',
        description: 'Spicy crispy chicken fillet with pickles and spicy sauce',
        price: 4.99,
        image: 'https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-spicy-crispy-chicken-sandwich:1-4-product-tile-desktop',
        category: 'CHICKEN & SANDWICHES'
      },
    ],
    'BEVERAGES': [
      {
        id: 5,
        name: 'Coca-Cola®',
        description: 'Ice-cold Coca-Cola®',
        price: 1.99,
        image: 'https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Coca-Cola-Classic-Small:1-4-product-tile-desktop',
        category: 'BEVERAGES'
      },
      {
        id: 6,
        name: 'Sprite®',
        description: 'Cool and refreshing Sprite®',
        price: 1.99,
        image: 'https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Sprite-Small:1-4-product-tile-desktop',
        category: 'BEVERAGES'
      },
    ],
    'DESSERTS': [
      {
        id: 7,
        name: 'Oreo® McFlurry',
        description: 'Vanilla soft serve with Oreo® cookie pieces',
        price: 3.49,
        image: 'https://s7d1.scene7.com/is/image/mcdonalds/t-oreo-mcflurry:1-4-product-tile-desktop',
        category: 'DESSERTS'
      },
      {
        id: 8,
        name: 'Hot Fudge Sundae',
        description: 'Vanilla soft serve with hot fudge topping',
        price: 2.99,
        image: 'https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Hot-Fudge-Sundae:1-4-product-tile-desktop',
        category: 'DESSERTS'
      },
    ],
    'SIDES': [
      {
        id: 9,
        name: 'World Famous Fries',
        description: 'Golden and crispy French fries',
        price: 2.49,
        image: 'https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-fries-small:1-4-product-tile-desktop',
        category: 'SIDES'
      },
      {
        id: 10,
        name: 'Apple Slices',
        description: 'Fresh-cut and ready to eat apple slices',
        price: 1.00,
        image: 'https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Apple-Slices:1-4-product-tile-desktop',
        category: 'SIDES'
      },
    ]
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: '#FFFFFF',
      pt: '64px', // height of navbar
      pb: cartItems.length > 0 ? '120px' : '0', // space for cart's bottom bar
    }}>
      <CategoryTabs 
        categories={categories} 
        onCategoryChange={handleCategoryChange} 
      />
      
      <Container maxWidth="sm" sx={{ py: 2 }}>
        <Box sx={{ px: 1 }}>
          {(products[selectedCategory] || []).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Box>
      </Container>

      <CartDrawer 
        open={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
      />
    </Box>
  );
};

export default Menu;
