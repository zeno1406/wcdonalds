import { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  Box,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  Restaurant as MenuIcon,
  ShoppingCart as OrdersIcon,
  Assessment as ReportsIcon,
} from '@mui/icons-material';

const TabPanel = ({ children, value, index }) => (
  <div hidden={value !== index}>
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </div>
);

// Mock data
const mockStats = [
  { title: 'Total Orders', value: '156', icon: <OrdersIcon /> },
  { title: 'Menu Items', value: '48', icon: <MenuIcon /> },
  { title: 'Daily Revenue', value: '$2,458', icon: <ReportsIcon /> },
];

const Admin = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {mockStats.map((stat, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card>
              <CardContent sx={{ 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    {stat.title}
                  </Typography>
                  <Typography variant="h4">
                    {stat.value}
                  </Typography>
                </Box>
                <Box sx={{ color: 'primary.main' }}>
                  {stat.icon}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ width: '100%' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': { minHeight: 64 }
          }}
        >
          <Tab 
            icon={<MenuIcon />} 
            label="Menu Management" 
            iconPosition="start"
          />
          <Tab 
            icon={<OrdersIcon />} 
            label="Orders" 
            iconPosition="start"
          />
          <Tab 
            icon={<ReportsIcon />} 
            label="Reports" 
            iconPosition="start"
          />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom>
            Menu Management
          </Typography>
          <Typography color="text.secondary">
            Here you can manage menu items, categories, and prices
          </Typography>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            Orders Management
          </Typography>
          <Typography color="text.secondary">
            View and manage current and past orders
          </Typography>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            Reports and Analytics
          </Typography>
          <Typography color="text.secondary">
            View sales reports and analytics
          </Typography>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default Admin;
