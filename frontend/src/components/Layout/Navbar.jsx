import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountCircleIcon,
  Login as LoginIcon
} from '@mui/icons-material';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Navbar = ({ onCartToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getCartCount } = useCart();
  const { user, logout } = useAuth();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  
  const [anchorEl, setAnchorEl] = useState(null);

  const handleCartClick = () => {
    if (isDesktop) {
      onCartToggle();
    } else {
      navigate('/cart');
    }
  };

  const handleUserMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleUserMenuClose();
    logout();
    navigate('/');
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
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1, 
            flexGrow: 1,
            cursor: 'pointer'
          }}
          onClick={() => navigate('/')}
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
              display: { xs: 'none', sm: 'block' }
            }}
          >
            WcDonald's
          </Typography>
        </Box>

        {user ? (
          <>
            <IconButton
              onClick={handleUserMenuOpen}
              sx={{
                color: '#000000',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                }
              }}
            >
              <AccountCircleIcon />
            </IconButton>
            
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleUserMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : location.pathname !== '/' && (
          <IconButton
            onClick={() => navigate('/')}
            sx={{
              color: '#000000',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              }
            }}
          >
            <LoginIcon />
          </IconButton>
        )}
        
        {location.pathname !== '/' && (
          <IconButton 
            onClick={handleCartClick}
            sx={{ 
              color: '#000000',
              display: { xs: 'none', sm: 'inline-flex' },
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
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;