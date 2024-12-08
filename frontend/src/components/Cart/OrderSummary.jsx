import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  Box,
  Button,
  Divider,
  TextField,
} from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

const OrderSummary = ({ 
  subtotal = 0, 
  tax = 0,
  discount = 0,
  total = 0, 
  showCheckoutButton = true,
  showDiscountInput = true,
  showTitle = false,
  discountCode = '',
  discountError = '',
  onDiscountChange,
  onApplyDiscount,
  onCheckout 
}) => {
  const navigate = useNavigate();
  const isCheckoutPage = !!onCheckout;

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
    } else {
      navigate('/checkout');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      {showTitle && (
        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>
      )}
      
      {showDiscountInput && isCheckoutPage && (
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            size="small"
            label="Discount Code"
            value={discountCode}
            onChange={(e) => onDiscountChange?.(e.target.value)}
            error={!!discountError}
            helperText={discountError}
            sx={{ mb: 1 }}
          />
          <Button
            fullWidth
            variant="outlined"
            onClick={onApplyDiscount}
            sx={{ 
              color: '#000000',
              borderColor: '#000000',
              '&:hover': {
                borderColor: '#000000',
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              }
            }}
          >
            Apply Code
          </Button>
        </Box>
      )}
      
      <Box sx={{ my: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Subtotal</Typography>
          <Typography>${subtotal.toFixed(2)}</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Tax (10%)</Typography>
          <Typography>${tax.toFixed(2)}</Typography>
        </Box>

        {discount > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>Discount</Typography>
            <Typography>-${discount.toFixed(2)}</Typography>
          </Box>
        )}
        
        <Divider sx={{ my: 1 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Total</Typography>
          <Typography variant="h6">${total.toFixed(2)}</Typography>
        </Box>

        {showCheckoutButton && (
          <>
            <Button
              fullWidth
              variant="contained"
              onClick={handleCheckout}
              startIcon={<ShoppingCartCheckoutIcon />}
              sx={{
                backgroundColor: '#DB0007',
                '&:hover': {
                  backgroundColor: '#B00006',
                },
                mb: 1
              }}
            >
              {isCheckoutPage ? 'PROCEED' : 'CHECKOUT'}
            </Button>
            {isCheckoutPage && (
              <Button
                fullWidth
                variant="text"
                onClick={() => navigate('/menu')}
                sx={{
                  color: '#000000',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                Back to Menu
              </Button>
            )}
          </>
        )}
      </Box>
    </Paper>
  );
};

export default OrderSummary;
