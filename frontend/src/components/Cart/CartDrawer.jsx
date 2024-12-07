import {
  Drawer,
  Typography,
  Box,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
  Paper,
  Button,
  Slide,
  SwipeableDrawer,
} from '@mui/material';
import { Close as CloseIcon, ShoppingBag as CheckoutIcon, KeyboardArrowUp as ExpandIcon } from '@mui/icons-material';
import { useCart } from '../../context/CartContext';
import CartItem from './CartItem';
import OrderSummary from './OrderSummary';
import { useState } from 'react';

const CartDrawer = ({ open, onClose }) => {
  const { cartItems, getCartTotal } = useCart();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isExpanded, setIsExpanded] = useState(false);
  
  const subtotal = getCartTotal();
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  // Calculate total quantity of all items
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  if (isMobile) {
    return (
      <>
        {/* Bottom Total Bar */}
        <Slide direction="up" in={cartItems.length > 0 && !isExpanded}>
          <Paper
            elevation={4}
            onClick={handleExpandClick}
            sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              p: 2,
              backgroundColor: '#fff',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
              borderTop: '1px solid rgba(0, 0, 0, 0.12)',
              cursor: 'pointer',
              zIndex: theme.zIndex.drawer + 2,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Box>
                <Typography variant="subtitle1" color="text.secondary">
                  {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Total: ${total.toFixed(2)}
                </Typography>
              </Box>
              <IconButton>
                <ExpandIcon sx={{ 
                  transform: isExpanded ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.3s',
                  color: '#FFC72C'
                }} />
              </IconButton>
            </Box>
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<CheckoutIcon />}
              onClick={(e) => {
                e.stopPropagation();
                // Handle checkout
              }}
              sx={{ 
                backgroundColor: '#FFC72C',
                color: '#000000',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#FFB700',
                }
              }}
            >
              CHECKOUT
            </Button>
          </Paper>
        </Slide>

        {/* Expandable Cart Items */}
        <SwipeableDrawer
          anchor="bottom"
          open={isExpanded}
          onClose={() => setIsExpanded(false)}
          onOpen={() => setIsExpanded(true)}
          disableSwipeToOpen
          PaperProps={{
            sx: {
              height: '80vh',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
              pb: '120px', // Space for bottom bar
            }
          }}
        >
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Your Cart ({totalQuantity} items)</Typography>
              <IconButton onClick={() => setIsExpanded(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            
            <Box sx={{ maxHeight: 'calc(80vh - 200px)', overflowY: 'auto' }}>
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </Box>

            <OrderSummary subtotal={subtotal} tax={tax} total={total} />
          </Box>
        </SwipeableDrawer>
      </>
    );
  }

  // Desktop version
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 400,
          p: 2,
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Your Cart ({totalQuantity} items)</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </Box>

      <Divider sx={{ my: 2 }} />
      <OrderSummary subtotal={subtotal} tax={tax} total={total} />
      
      <Button
        fullWidth
        variant="contained"
        size="large"
        startIcon={<CheckoutIcon />}
        sx={{ 
          mt: 2,
          backgroundColor: '#FFC72C',
          color: '#000000',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: '#FFB700',
          }
        }}
      >
        CHECKOUT
      </Button>
    </Drawer>
  );
};

export default CartDrawer;
