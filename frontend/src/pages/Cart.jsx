import { useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, Box } from '@mui/material';
import CartItem from '../components/Cart/CartItem';
import OrderSummary from '../components/Cart/OrderSummary';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal } = useCart();

  const subtotal = getCartTotal();
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Your Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            Your cart is empty
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </Grid>
          
          <Grid item xs={12} md={4}>
            <OrderSummary
              subtotal={subtotal}
              tax={tax}
              total={total}
              onCheckout={handleCheckout}
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Cart;
