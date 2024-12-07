import { useState, useEffect } from 'react';
import { Tabs, Tab, Box, useTheme, useMediaQuery } from '@mui/material';

const CategoryTabs = ({ categories, selectedCategory, onCategoryChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    // Update selectedTab when selectedCategory changes from parent
    const index = categories.indexOf(selectedCategory);
    if (index !== -1) {
      setSelectedTab(index);
    }
  }, [selectedCategory, categories]);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
    onCategoryChange(categories[newValue]);
  };

  return (
    <Box sx={{ 
      width: isDesktop ? '280px' : '100%',
      bgcolor: 'background.paper',
      ...(isDesktop ? {
        position: 'sticky',
        top: 64,
        height: 'calc(100vh - 64px)',
        overflowY: 'auto',
        borderRight: '1px solid rgba(0, 0, 0, 0.12)',
      } : {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
      })
    }}>
      <Tabs 
        value={selectedTab} 
        onChange={handleChange}
        variant={isDesktop ? "standard" : "scrollable"}
        scrollButtons="auto"
        allowScrollButtonsMobile
        orientation={isDesktop ? "vertical" : "horizontal"}
        sx={{
          '& .MuiTab-root': {
            color: '#000000',
            fontSize: '0.875rem',
            minHeight: isDesktop ? '48px' : '40px',
            minWidth: isDesktop ? '280px' : '120px',
            padding: isDesktop ? '12px 24px' : '6px 16px',
            textTransform: 'none',
            fontWeight: 500,
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            '&.Mui-selected': {
              color: '#000000',
              fontWeight: 700,
              backgroundColor: isDesktop ? 'rgba(255, 199, 44, 0.08)' : 'transparent',
            }
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#FFC72C',
            ...(isDesktop ? {
              right: 'auto',
              left: 0,
              width: '4px'
            } : {
              bottom: 0,
              height: '3px'
            })
          },
          ...(isDesktop ? {
            '& .MuiTabs-flexContainer': {
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
            }
          } : {
            minHeight: '40px',
            height: '40px'
          })
        }}
      >
        {categories.map((category, index) => (
          <Tab 
            key={category}
            label={category}
            id={`menu-tab-${index}`}
            aria-controls={`menu-tabpanel-${index}`}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default CategoryTabs;
