// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Sidebar from './components/Sidebar';
import Dashboard from './components/pages/Dashboard';
import CategoryManagement from './components/pages/CategoryManagement';
import EndpointForm from './components/EndpointForm';
import Navbar from './components/Navbar';
import Settings from './components/pages/Settings';

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Box sx={{ display: 'flex' }}>
          <Sidebar />
          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/category-management" element={<CategoryManagement />} />
              <Route path="/create-endpoint" element={<EndpointForm />} />
              <Route path="/endpoint-form" element={<EndpointForm />} />
              {/* <Route path="/endpoint-form" element={<EndpointForm />} /> */}
              <Route path="/settings" element={<Settings/>} /> {/* Placeholder for Settings Page */}
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
