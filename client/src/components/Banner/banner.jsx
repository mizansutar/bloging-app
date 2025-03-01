import React from 'react';
import { Box, Typography } from '@mui/material';
import backgroundImage from './background.jpg'; // Adjust the path accordingly

const BannerPage = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '97%',
        height: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        color: '#fff', // Default text color
        padding: 2,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '3rem', md: '5rem' }, // Responsive font size
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          mb: 2, // Margin bottom
        }}
      >
        Blogg
      </Typography>
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: '1.5rem', md: '2.5rem' }, // Responsive font size
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          padding: '0.5rem 1rem',
          borderRadius: '5px',
          textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
        }}
      >
        The Code is Life
      </Typography>
    </Box>
  );
};

export default BannerPage;
