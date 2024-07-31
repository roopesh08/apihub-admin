// src/components/Sidebar.js
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import { Link } from 'react-router-dom';
import ApiIcon from '@mui/icons-material/Api';

const drawerWidth = 240;

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#f5f7fa' },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap>
          Admin Portal
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/category-management">
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Category Management" />
        </ListItem>
        <ListItem button component={Link} to="/endpoint-form">
          <ListItemIcon>
            <ApiIcon />
          </ListItemIcon>
          <ListItemText primary="EndPoint" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
