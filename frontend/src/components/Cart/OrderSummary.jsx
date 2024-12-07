import {
  Paper,
  Typography,
  Divider,
  Button,
  Box,
} from '@mui/material';
import { ShoppingBag as CheckoutIcon } from '@mui/icons-material';

const OrderSummary = ({ subtotal = 0, tax = 0, total = 0, onCheckout }) => {
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      
      <Box sx={{ my: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Subtotal</Typography>
          <Typography>${subtotal.toFixed(2)}</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Tax (10%)</Typography>
          <Typography>${tax.toFixed(2)}</Typography>
        </Box>
        
        <Divider sx={{ my: 1 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Total</Typography>
          <Typography variant="h6">${total.toFixed(2)}</Typography>
        </Box>
      </Box>

      <Button
        fullWidth
        variant="contained"
        size="large"
        startIcon={<CheckoutIcon />}
        onClick={onCheckout}
        sx={{ 
          backgroundColor: '#FFC72C',
          color: '#000000',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: '#FFB700',
          }
        }}
      >
        Checkout
      </Button>
    </Paper>
  );
};

export default OrderSummary;
