import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, List, ListItem, ListItemText, Avatar, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  listItem: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '16px',
    marginBottom: '8px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  avatar: {
    marginRight: '16px',
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  },
  listItemText: {
    flex: '1 1 auto',
  },
  primaryText: {
    fontWeight: 'bold',
  },
  secondaryText: {
    color: theme.palette.text.secondary,
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      console.log('Response:', response.data);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
     
      <Box mt={2}>
        <Typography variant="h5" gutterBottom>
          Categories
        </Typography>
        <List>
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <ListItem key={category._id} className={classes.listItem}>
                <Avatar className={classes.avatar}>{index + 1}</Avatar>
                <ListItemText
                  primary={<Typography className={classes.primaryText}>{category.name}</Typography>}
                  secondary={<Typography className={classes.secondaryText}>{category.desc}</Typography>}
                  className={classes.listItemText}
                />
              </ListItem>
            ))
          ) : (
            <Typography variant="body1">No categories available.</Typography>
          )}
        </List>
      </Box>
    </Box>
  );
};

export default Dashboard;
