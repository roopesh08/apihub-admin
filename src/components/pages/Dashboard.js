// src/pages/Dashboard.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import Charts from '../charts';

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Charts />
    </Box>
  );
};

export default Dashboard;
