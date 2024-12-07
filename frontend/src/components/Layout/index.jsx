import { Box } from '@mui/material';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 8,
          px: 3,
          mt: 8,
          backgroundColor: '#f5f5f5'
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
