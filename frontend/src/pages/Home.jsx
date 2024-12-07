import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Paper,
} from '@mui/material';
import {
  RestaurantMenu as MenuIcon,
  ShoppingCart as CartIcon,
} from '@mui/icons-material';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <MenuIcon sx={{ fontSize: 40 }} />,
      title: 'Browse Menu',
      description: 'Explore our delicious menu items',
      action: () => navigate('/menu'),
    },
    {
      icon: <CartIcon sx={{ fontSize: 40 }} />,
      title: 'View Cart',
      description: 'Check your current order',
      action: () => navigate('/cart'),
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to WcDonald's
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          Fast, efficient, and delicious ordering system
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<MenuIcon />}
          onClick={() => navigate('/menu')}
          sx={{ mt: 2 }}
        >
          Order Now
        </Button>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Paper
              sx={{
                p: 4,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                cursor: 'pointer',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 3,
                },
              }}
              onClick={feature.action}
            >
              <Box sx={{ color: 'primary.main', mb: 2 }}>
                {feature.icon}
              </Box>
              <Typography variant="h5" gutterBottom>
                {feature.title}
              </Typography>
              <Typography color="text.secondary">
                {feature.description}
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 3 }}
                onClick={feature.action}
              >
                {feature.title}
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
