import { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
  Grid,
} from '@mui/material';
import OrderSummary from '../components/Cart/OrderSummary';

const steps = ['Delivery Details', 'Payment', 'Review Order'];

// Mock data - will be replaced with Redux state
const mockCartItems = [
  {
    id: 1,
    name: 'Big Wac',
    price: 5.99,
    quantity: 2,
  },
];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);

  const subtotal = mockCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Checkout
        </Typography>

        <Stepper activeStep={activeStep} sx={{ py: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Box sx={{ mt: 2 }}>
              {/* Placeholder for step content */}
              <Typography variant="h6" gutterBottom>
                {steps[activeStep]}
              </Typography>
              <Typography color="text.secondary">
                Step content will be implemented here
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                onClick={handleBack}
                disabled={activeStep === 0}
                variant="outlined"
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={activeStep === steps.length - 1}
              >
                {activeStep === steps.length - 2 ? 'Place Order' : 'Next'}
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <OrderSummary
              subtotal={subtotal}
              tax={tax}
              total={total}
              onCheckout={() => {}}
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Checkout;
