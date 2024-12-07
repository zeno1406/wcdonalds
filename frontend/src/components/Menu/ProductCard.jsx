import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Snackbar,
} from '@mui/material';
import { AddShoppingCart as AddIcon } from '@mui/icons-material';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const { name, price, image, description } = product;
  const { addToCart } = useCart();
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setShowSnackbar(true);
  };

  return (
    <>
      <Card sx={{ 
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        overflow: 'hidden',
        mb: 2,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}>
        <CardMedia
          component="img"
          sx={{ 
            width: '100%',
            backgroundColor: '#f5f5f5',
          }}
          image={image || 'https://via.placeholder.com/300'}
          alt={name}
        />
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          p: 2,
          gap: 1
        }}>
          <Box>
            <Typography 
              variant="h6" 
              component="h2"
              sx={{ 
                color: '#000000',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                mb: 0.5
              }}
            >
              {name}
            </Typography>
            
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(0, 0, 0, 0.6)',
                fontSize: '0.875rem',
                lineHeight: 1.4,
                mb: 1
              }}
            >
              {description}
            </Typography>
          </Box>

          <Box sx={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 'auto'
          }}>
            <Typography 
              variant="h6"
              sx={{ 
                color: '#000000',
                fontWeight: 'bold',
                fontSize: '1.1rem'
              }}
            >
              ${price.toFixed(2)}
            </Typography>

            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={handleAddToCart}
              sx={{
                backgroundColor: '#FFC72C',
                color: '#000000',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#FFB700',
                },
                minWidth: '100px'
              }}
            >
              ADD
            </Button>
          </Box>
        </Box>
      </Card>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={2000}
        onClose={() => setShowSnackbar(false)}
        message="Item added to cart"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
};

export default ProductCard;
