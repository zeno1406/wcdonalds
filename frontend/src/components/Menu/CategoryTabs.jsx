import { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';

const CategoryTabs = ({ categories, onCategoryChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
    onCategoryChange(categories[newValue]);
  };

  return (
    <Box sx={{ 
      width: '100%',
      bgcolor: '#FFFFFF',
      position: 'sticky',
      top: 64,
      zIndex: 1,
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    }}>
      <Tabs 
        value={selectedTab} 
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          '& .MuiTab-root': {
            color: '#000000',
            fontSize: '0.875rem',
            minWidth: 'auto',
            padding: '12px 16px',
            textTransform: 'none',
            fontWeight: 500,
            '&.Mui-selected': {
              color: '#000000',
              fontWeight: 700,
            }
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#FFC72C',
            height: 3,
          },
          '& .MuiTabs-scrollButtons': {
            color: '#000000',
          }
        }}
      >
        {categories.map((category, index) => (
          <Tab 
            key={index}
            label={category}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default CategoryTabs;
