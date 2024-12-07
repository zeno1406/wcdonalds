import {
  Drawer,
  Typography,
  Box,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
  Paper, 
  Slide,
  SwipeableDrawer,
  Badge
} from '@mui/material';
import {ShoppingBag as CartIcon, KeyboardArrowUp as ExpandIcon } from '@mui/icons-material';
import { useCart } from '../../context/CartContext';
import CartItem from './CartItem';
import OrderSummary from './OrderSummary';
import { useState } from 'react';

const CartDrawer = () => {
  const { cartItems, getCartTotal } = useCart();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isExpanded, setIsExpanded] = useState(false);
  
  const subtotal = getCartTotal();
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  // Calculate total quantity of all items
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleExpandClick = ({open, onClose}) => {
    setIsExpanded(!isExpanded);
  };

  const cartContent = (
    <>
      <Box
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Your Cart
        </Typography>
      </Box>

      <Box sx={{ 
        flexGrow: 1, 
        overflowY: 'auto',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}>
        {cartItems.length === 0 ? (
          <Typography variant="body1" color="text.secondary" align="center">
            Your cart is empty.
          </Typography>
        ) : (
          cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))
        )}
      </Box>

      {cartItems.length > 0 && (
        <>
          <Divider />
          <OrderSummary subtotal={subtotal} tax={tax} total={total} />
        </>
      )}
    </>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile bottom bar */}
        <Slide direction="up" in={!isExpanded && cartItems.length > 0} mountOnEnter unmountOnExit>
          <Paper
            elevation={3}
            onClick={handleExpandClick}
            sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: theme.zIndex.drawer + 2,
              p: 2,
              cursor: 'pointer'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Badge 
                  badgeContent={totalQuantity} 
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
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  ${total.toFixed(2)}
                </Typography>
              </Box>
              <IconButton>
                <ExpandIcon sx={{ color: '#FFC72C' }} />
              </IconButton>
            </Box>
          </Paper>
        </Slide>

        {/* Full cart drawer */}
        <SwipeableDrawer
          anchor="bottom"
          open={isExpanded}
          onClose={() => setIsExpanded(false)}
          sx={{
            '& .MuiDrawer-paper': {
              height: '90vh',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
            }
          }}
        >
          {cartContent}
        </SwipeableDrawer>
      </>
    );
  }

  // Desktop layout
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {cartContent}
    </Box>
  );
};

export default CartDrawer;
