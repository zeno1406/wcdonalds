import React from 'react';
import { 
  Box, 
  Typography, 
  useTheme, 
  useMediaQuery, 
  Tabs, 
  Tab 
} from '@mui/material';

const CategoryTabs = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  categoryRefs 
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const handleCategoryClick = (category) => {
    onCategoryChange(category);
    if (categoryRefs && categoryRefs[category]) {
      categoryRefs[category].current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  const handleChange = (event, newValue) => {
    handleCategoryClick(categories[newValue]);
  };

  if (isDesktop) {
    return (
      <Box sx={{ 
        width: '15%',
        bgcolor: 'background.paper',
        position: 'sticky',
        top: 64,
        height: 'calc(100vh - 64px)',
        overflowY: 'auto'
      }}>
        {categories.map((category) => (
          <Box 
            key={category}
            sx={{ 
              position: 'relative',
              borderLeft: selectedCategory === category 
                ? '4px solid #FFC72C' 
                : '4px solid transparent',
              transition: 'border-left-color 0.2s ease'
            }}
          >
            <Box
              onClick={() => handleCategoryClick(category)}
              sx={{
                p: 2,
                cursor: 'pointer',
                fontWeight: selectedCategory === category ? 'bold' : 'normal',
                color: selectedCategory === category ? '#000000' : 'inherit',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              {category}
            </Box>
          </Box>
        ))}
      </Box>
    );
  }

  // Mobile View
  return (
    <Box sx={{ 
      width: '100%', 
      position: 'sticky',
      top: 0, 
      zIndex: 10, 
      bgcolor: 'background.paper',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)', // For Safari support
      backgroundColor: 'rgba(255, 255, 255, 0.8)' // Slightly transparent background
    }}>
      <Tabs
        value={categories.indexOf(selectedCategory)}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          width: '100%',
          '& .MuiTabs-scroller': {
            width: '100%'
          },
          '& .MuiTabs-flexContainer': {
            width: '100%',
            justifyContent: 'space-between'
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#FFC72C',
            height: '4px'
          },
          '& .MuiTab-root': {
            width: 'auto',
            maxWidth: 'none',
            textTransform: 'none',
            minWidth: 'auto',
            padding: '12px 16px',
            color: 'rgba(0, 0, 0, 0.6)',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.1)'
            },
            '&.Mui-selected': {
              color: '#000000',
              fontWeight: 'bold'
            }
          }
        }}
      >
        {categories.map((category) => (
          <Tab 
            key={category} 
            label={category} 
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default CategoryTabs;