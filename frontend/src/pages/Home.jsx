import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  TextField,
  Paper,
  Link,
  Alert,
  Divider,
} from '@mui/material';
import {
  Lock as LockIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
    setError(''); // Clear error when user types
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (isLogin) {
      const result = login(formData.username, formData.password);
      if (result.success) {
        navigate('/menu');
      } else {
        setError('Invalid username or password');
      }
    } else {
      // Sign up validation
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      
      const result = register(formData.username, formData.password);
      if (result.success) {
        // Auto login after successful registration
        login(formData.username, formData.password);
        navigate('/menu');
      } else {
        setError(result.error || 'Username already exists');
      }
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({
      username: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <Container maxWidth="sm" sx={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      py: 8 
    }}>
      <Paper 
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 'bold',
            color: '#DB0007',
            mb: 3
          }}
        >
          WcDonald's
        </Typography>

        <Typography variant="h6" gutterBottom>
          {isLogin ? 'Sign in to your account' : 'Create an account'}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleChange('username')}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete={isLogin ? 'current-password' : 'new-password'}
            value={formData.password}
            onChange={handleChange('password')}
          />

          {!isLogin && (
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
            />
          )}
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ 
              mt: 3, 
              mb: 2,
              bgcolor: '#FFC72C',
              color: '#000000',
              '&:hover': {
                bgcolor: '#FFB700',
              }
            }}
          >
            Sign In
          </Button>

          <Typography variant="body2" sx={{ mb: 3, whiteSpace: 'nowrap' }}>
            {isLogin ?  'Don\'t have an account?' : 'Already have an account?'}
            <Link
            variant="body2"
            onClick={switchMode}
            sx={{
              ml: 0.5,
              color: '#DB0007',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              }
            }}
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </Link>
          </Typography>
          

          <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', mb: 3 }}>
            <Divider sx={{ flexGrow: 1 }} />
            <Typography variant="body2" sx={{ mx: 2 }}>
              OR
            </Typography>
            <Divider sx={{ flexGrow: 1 }} />
          </Box>

          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate('/menu')}
            sx={{
              backgroundColor: '#DB0007',
              color: '#000000',
              borderColor: '#000000',
              '&:hover': {
                borderColor: '#000000',
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              }
            }}
          >
            Continue as Guest
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;
