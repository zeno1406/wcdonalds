import {
  Box,
  Typography,
  IconButton,
  Card,
  CardMedia,
  ButtonGroup,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
} from '@mui/icons-material';
import { useCart } from '../../context/CartContext';

const CartItem = ({ item }) => {
  const { name, price, quantity, image } = item;
  const { addToCart, decreaseQuantity } = useCart();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleIncrease = () => {
    addToCart(item);
  };

  const handleDecrease = () => {
    decreaseQuantity(item.id);
  };

  if (isMobile) {
    return (
      <Card sx={{ 
        display: 'flex', 
        mb: 2,
        overflow: 'hidden',
        height: '100px'
      }}>
        <CardMedia
          component="img"
          sx={{ 
            width: '80px',
            height: '80px',
            objectFit: 'contain',
            backgroundColor: '#f5f5f5',
            p: 1
          }}
          image={image || 'https://via.placeholder.com/100'}
          alt={name}
        />
        
        <Box sx={{ 
          display: 'flex', 
          flexGrow: 1,
          p: 1,
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            flexGrow: 1,
            mr: 1
          }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              ${price.toFixed(2)} × {quantity}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ButtonGroup size="small" orientation="vertical">
              <IconButton 
                size="small"
                onClick={handleIncrease}
              >
                <AddIcon fontSize="small" />
              </IconButton>
              <Typography align="center">
                {quantity}
              </Typography>
              <IconButton 
                size="small"
                onClick={handleDecrease}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
            </ButtonGroup>
          </Box>
        </Box>
      </Card>
    );
  }

  return (
    <Card sx={{ display: 'flex', mb: 2, p: 2 }}>
      <CardMedia
        component="img"
        sx={{ 
          width: 80, 
          height: 80, 
          objectFit: 'contain',
          backgroundColor: '#f5f5f5',
          p: 1
        }}
        image={image || 'https://via.placeholder.com/100'}
        alt={name}
      />
      
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        ml: 2
      }}>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          ${price.toFixed(2)}
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          mt: 'auto'
        }}>
          <ButtonGroup size="small">
            <IconButton onClick={handleDecrease}>
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography sx={{ px: 2, display: 'flex', alignItems: 'center' }}>
              {quantity}
            </Typography>
            <IconButton onClick={handleIncrease}>
              <AddIcon fontSize="small" />
            </IconButton>
          </ButtonGroup>
        </Box>
      </Box>
    </Card>
  );
};

export default CartItem;
