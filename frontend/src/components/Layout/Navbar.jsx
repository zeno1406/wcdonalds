import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
} from '@mui/icons-material';
import { useCart } from '../../context/CartContext';

const Navbar = ({ onCartClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getCartCount } = useCart();

  const handleCartClick = () => {
    if (location.pathname === '/menu') {
      // If we're on the menu page, toggle the cart drawer
      onCartClick();
    } else {
      // Otherwise navigate to cart page
      navigate('/cart');
    }
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        backgroundColor: '#FFC72C',
        color: '#000000'
      }}
    >
      <Toolbar>
        <Box 
          onClick={() => navigate('/menu')}
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1, 
            cursor: 'pointer',
            flexGrow: 1,
          }}
        >
          <Box
            component="img"
            src="/images/wcdonalds.png"
            alt="WcDonald's Logo"
            sx={{
              height: 40,
              width: 'auto',
              display: 'block'
            }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ 
              fontWeight: 'bold',
              display: { xs: 'none', sm: 'block' }  // Hide text on mobile
            }}
          >
            WcDonald's
          </Typography>
        </Box>
        
        <IconButton 
          onClick={handleCartClick}
          sx={{ 
            display: { xs: 'none', md: 'flex' },  // Hide on mobile, show on desktop
            color: '#000000',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
            }
          }}
        >
          <Badge 
            badgeContent={getCartCount()} 
            color="error"
            sx={{
              '& .MuiBadge-badge': {
                backgroundColor: '#DB0007',
                color: '#FFFFFF',
              }
            }}
          >
            <CartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
