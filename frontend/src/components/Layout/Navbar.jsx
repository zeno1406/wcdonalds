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
        <Typography
          variant="h6"
          component="div"
          sx={{ 
            flexGrow: 1, 
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
          onClick={() => navigate('/menu')}
        >
          WcDonald's
        </Typography>
        
        <Box>
          <IconButton 
            onClick={handleCartClick}
            sx={{ 
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
