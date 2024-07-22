// src/pages/AddCategory.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box } from '@mui/material';

const AddCategory = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/categories', { name });
      console.log(response.data);
      setName('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        Add Category
      </Typography>
      <TextField
        label="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <Button type="submit" variant="contained" color="primary">
        Add Category
      </Button>
    </Box>
  );
};

export default AddCategory;
