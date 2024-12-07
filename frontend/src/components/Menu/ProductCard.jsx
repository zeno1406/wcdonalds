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
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        overflow: 'hidden',
        mb: 2,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        height: '120px'
      }}>
        <CardMedia
          component="img"
          sx={{ 
            width: 120,
            height: '100%',
            objectFit: 'contain',
            backgroundColor: '#f5f5f5',
            p: 1,
            flexShrink: 0
          }}
          image={image || 'https://via.placeholder.com/300'}
          alt={name}
        />
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          flexGrow: 1,
          p: 2,
          justifyContent: 'space-between'
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
                lineHeight: 1.2,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {description}
            </Typography>
          </Box>

          <Box sx={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 1
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
              startIcon={<AddIcon />}
              onClick={handleAddToCart}
              size="small"
              sx={{
                backgroundColor: '#FFC72C',
                color: '#000000',
                fontWeight: 'bold',
                fontSize: '0.875rem',
                px: 2,
                minWidth: 'auto',
                '&:hover': {
                  backgroundColor: '#FFB700',
                },
              }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Card>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={2000}
        onClose={() => setShowSnackbar(false)}
        message={`${name} added to cart!`}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: '#4CAF50',
            color: '#FFFFFF'
          }
        }}
      />
    </>
  );
};

export default ProductCard;
