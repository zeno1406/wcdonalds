import { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Grid,
  TextField,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  LocalAtm as CashIcon,
  AccountBalanceWallet as BankIcon,
  QrCode2 as QrCodeIcon,
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CartItem from '../components/Cart/CartItem';
import OrderSummary from '../components/Cart/OrderSummary';
import { menuData } from '../data/menuData';
import { recommendedItemsConfig, discountCodes } from '../data/appData';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, updateItemQuantity, getCartTotal, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  
  const [discountCode, setDiscountCode] = useState('');
  const [discountError, setDiscountError] = useState('');
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [paymentStep, setPaymentStep] = useState('options'); // options, qr, processing, thankyou
  const [qrCode, setQRCode] = useState(null);
  const [isQRDialogOpen, setIsQRDialogOpen] = useState(false);

  const subtotal = getCartTotal();
  const tax = subtotal * 0.1;
  const discount = user && discountCodes[discountCode] ? subtotal * discountCodes[discountCode].discount : 0;
  const total = subtotal + tax - discount;

  // Get recommended items based on configuration
  const getRecommendedItems = () => {
    const config = recommendedItemsConfig.checkout;
    return config.preferredItems
      .map(itemName => {
        for (const category of config.categories) {
          const item = menuData[category]?.find(item => 
            item.name.includes(itemName)
          );
          if (item) return item;
        }
        return null;
      })
      .filter(Boolean)
      .slice(0, config.maxItems);
  };

  const recommendedItems = getRecommendedItems();

  const handleDiscountCode = () => {
    if (!user) {
      setDiscountError('Please log in to use discount codes');
      return;
    }

    const discountInfo = discountCodes[discountCode];
    if (!discountInfo) {
      setDiscountError('Invalid discount code');
      return;
    }

    if (discountInfo.requiresAuth && !user) {
      setDiscountError('Please log in to use this discount code');
      return;
    }

    setDiscount(subtotal * discountInfo.discount);
    setDiscountError('');
  };

  const handlePayment = (method) => {
    if (method === 'bank') {
      setPaymentStep('qr');
    } else {
      setPaymentStep('processing');
      setTimeout(() => {
        setPaymentStep('thankyou');
        setTimeout(() => {
          setPaymentStep('options');
          setShowPaymentOptions(false);
          handlePaymentSuccess('Your invoice is being printed. Please proceed to the cashier.');
        }, 2000);
      }, 5000);
    }
  };

  const handleBankPaymentComplete = () => {
    setPaymentStep('processing');
    setTimeout(() => {
      setPaymentStep('thankyou');
      setTimeout(() => {
        setPaymentStep('options');
        setShowPaymentOptions(false);
        handlePaymentSuccess('Payment completed successfully!');
      }, 2000);
    }, 5000);
  };

  const handlePaymentSuccess = (message) => {
    clearCart();
    setSuccessMessage(message);
    setShowSuccessMessage(true);
    
    // Redirect to menu after 3 seconds
    setTimeout(() => {
      navigate('/menu');
    }, 3000);
  };

  const handleQuantityChange = (itemId, change) => {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        updateItemQuantity(itemId, newQuantity);
      } else {
        removeFromCart(itemId);
      }
    }
  };

  const handleAddRecommendedItem = (item) => {
    addToCart(item);
    setSuccessMessage(`Added ${item.name} to your order!`);
    setShowSuccessMessage(true);
  };

  const generateVietQRPayment = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming you store JWT
      const response = await axios.post('/api/payments/qr', {
        amount: getCartTotal(),
        items: cartItems
      }, {
        headers: { 
          'Authorization': `Bearer ${token}` 
        }
      });

      if (response.data.success) {
        setQRCode(response.data.data.qrUrl);
        setIsQRDialogOpen(true);
      }
    } catch (error) {
      console.error('QR Generation Error:', error);
      // Handle error (show snackbar, etc.)
    }
  };

  // Redirect to cart if it's empty
  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Your cart is empty
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/menu')}
            sx={{ 
              mt: 2,
              bgcolor: '#FFC72C',
              color: '#000000',
              '&:hover': {
                bgcolor: '#FFB700',
              }
            }}
          >
            Return to Menu
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Order Summary */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Order Summary
            </Typography>
            {cartItems.map((item) => (
              <CartItem 
                key={item.id} 
                item={item} 
                onQuantityChange={handleQuantityChange}
              />
            ))}
          </Paper>

          {/* Recommendations */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Recommended for You
            </Typography>
            <Grid container spacing={2}>
              {recommendedItems.map((item) => (
                <Grid item xs={12} key={item.id}>
                  <Card sx={{ display: 'flex', height: '140px' }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 140, objectFit: 'cover' }}
                      image={item.image}
                      alt={item.name}
                    />
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      justifyContent: 'center',
                      p: 2,
                      width: '100%'
                    }}>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        mb: 1
                      }}>
                        <Typography variant="h6">{item.name}</Typography>
                        <Typography variant="h6" color="text.secondary">
                          ${item.price.toFixed(2)}
                        </Typography>
                      </Box>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleAddRecommendedItem(item)}
                        sx={{ 
                          alignSelf: 'flex-start',
                          borderColor: '#000000',
                          color: '#000000',
                          '&:hover': {
                            borderColor: '#000000',
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                          }
                        }}
                      >
                        Add to Order
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Payment Summary */}
        <Grid item xs={12} md={4}>
          <Box sx={{ position: 'sticky', top: 20 }}>
            <OrderSummary
              subtotal={subtotal}
              tax={tax}
              discount={discount}
              total={total}
              showCheckoutButton={true}
              showDiscountInput={true}
              discountCode={discountCode}
              discountError={discountError}
              onDiscountChange={setDiscountCode}
              onApplyDiscount={handleDiscountCode}
              onCheckout={() => setShowPaymentOptions(true)}
            />
          </Box>
        </Grid>
      </Grid>

      {/* Payment Options Dialog */}
      <Dialog 
        open={showPaymentOptions} 
        onClose={() => !['processing', 'thankyou'].includes(paymentStep) && setShowPaymentOptions(false)}
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: '400px',
          }
        }}
      >
        <DialogTitle>
          <Typography variant="h6" align="center">
            {paymentStep === 'processing' ? 'Processing Payment' : 
             paymentStep === 'thankyou' ? 'Thank You!' :
             paymentStep === 'qr' ? 'Scan QR Code' : 
             'Choose Payment Method'}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {paymentStep === 'options' && (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'row', 
              gap: 2,
              p: 2
            }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => handlePayment('cash')}
                sx={{ 
                  py: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  borderColor: '#000000',
                  color: '#000000',
                  '&:hover': {
                    borderColor: '#000000',
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  }
                }}
              >
                <CashIcon sx={{ fontSize: 40 }} />
                <Typography>Cash</Typography>
              </Button>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => handlePayment('bank')}
                sx={{ 
                  py: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  borderColor: '#000000',
                  color: '#000000',
                  '&:hover': {
                    borderColor: '#000000',
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  }
                }}
              >
                <BankIcon sx={{ fontSize: 40 }} />
                <Typography>Bank Transfer</Typography>
              </Button>
              <Button
                fullWidth
                variant="outlined"
                onClick={generateVietQRPayment}
                sx={{ 
                  py: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  borderColor: '#000000',
                  color: '#000000',
                  '&:hover': {
                    borderColor: '#000000',
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  }
                }}
              >
                <QrCodeIcon sx={{ fontSize: 40 }} />
                <Typography>Pay with VietQR</Typography>
              </Button>
            </Box>
          )}

          {paymentStep === 'qr' && (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: 3,
              p: 4
            }}>
              <img 
                src="/images/qr_payment.jpg" 
                alt="QR Code for payment" 
                style={{ width: 200, height: 200 }}
              />
              <Typography variant="body1" align="center">
                Scan this QR code to complete your payment
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleBankPaymentComplete}
                sx={{ mt: 2 }}
              >
                I have completed the payment
              </Button>
            </Box>
          )}

          {paymentStep === 'processing' && (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: 2,
              p: 4
            }}>
              <CircularProgress size={60} />
              <Typography variant="h6" align="center">
                Processing your payment...
              </Typography>
              <Typography color="text.secondary" align="center">
                Please wait while we process your transaction
              </Typography>
            </Box>
          )}

          {paymentStep === 'thankyou' && (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: 2,
              p: 4
            }}>
              <Typography variant="h4" align="center" sx={{ color: 'success.main' }}>
                ✓
              </Typography>
              <Typography variant="h6" align="center">
                Payment Successful!
              </Typography>
              <Typography color="text.secondary" align="center">
                Thank you for choosing WcDonald's
              </Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>

      <Dialog 
        open={isQRDialogOpen} 
        onClose={() => setIsQRDialogOpen(false)}
      >
        <DialogTitle>Scan to Pay</DialogTitle>
        <DialogContent>
          {qrCode && (
            <img 
              src={qrCode} 
              alt="Payment QR Code" 
              style={{ width: '100%', maxWidth: '300px' }} 
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Success Message */}
      <Snackbar
        open={showSuccessMessage}
        autoHideDuration={3000}
        onClose={() => setShowSuccessMessage(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowSuccessMessage(false)} 
          severity="success"
          sx={{ width: '100%' }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Checkout;
