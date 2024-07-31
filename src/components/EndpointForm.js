// src/pages/EndpointForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, MenuItem, Typography, Box, Modal } from '@mui/material';

const EndpointForm = () => {
  const initialState = {
    endpointName: '',
    category: '',
    description: '',
    jsonFile: null,
  }
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState(initialState);
  const [fileContent, setFileContent] = useState(null);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorModalContent, setErrorModalContent] = useState({
    title: '',
    description: "",
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.name.split('.').pop() !== 'json') {
      setErrorModalOpen(true);
      setErrorModalContent({
        ...errorModalContent,
        title: 'Error',
        description: "You have to upload a JSON file only."
      })
      return;
    }

    setFormData({ ...formData, jsonFile: file });

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = JSON.parse(e.target.result);
      setFileContent(content[0] || content);
    };
    reader.readAsText(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('haaa', fileContent)
    if (!fileContent) {
      setErrorModalOpen(true)
      setErrorModalContent({
        ...errorModalContent,
        title: 'Error',
        description: "Please Upload JSON file to submit"
      })
    } else {
      const data = {
        endpointName: formData.endpointName,
        category: formData.category,
        description: formData.description,
        fileContent: fileContent
      }

      try {
        console.log('Form submitted successfully:', formData, data);
        const response = await axios.post('http://localhost:5000/api/endpoints', data);
        if (response.status === 200) {
          setFormData(initialState)
          setFileContent(null)
          setErrorModalOpen(true)
          setTimeout(() => setErrorModalOpen(false), 3000)
          setErrorModalContent({
            ...errorModalContent,
            title: 'Success',
            description: "Endpoint added succesfully"
          })
        } else {
          setErrorModalContent({
            ...errorModalContent,
            title: 'Error',
            description: "Failed to create Endpoint"
          })
        }
        console.log('ress', response)
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Add Endpoint
      </Typography>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <TextField
          label="Endpoint Name"
          name="endpointName"
          value={formData.endpointName}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          select
          fullWidth
          margin="normal"
          required
        >
          {categories.map(category => (
            <MenuItem key={category._id} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          multiline
          rows={4}
          fullWidth
          margin="normal"
          required
        />
        <Button
          variant="contained"
          component="label"
          fullWidth
          sx={{ mt: 2, mb: 2 }}
        >
          Upload JSON File
          <input
            type="file"
            accept=".json"
            hidden
            onChange={handleFileChange}

          />
        </Button>
        {fileContent && (
          <Box mt={2}>
            <Typography variant="h6">Uploaded JSON Content (First Object):</Typography>
            <pre style={{ maxHeight: '200px', overflow: 'auto', background: '#f4f4f4', padding: '10px', borderRadius: '4px' }}>
              {JSON.stringify(fileContent, null, 2)}
            </pre>
          </Box>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Submit
        </Button>
      </form>

      <Modal
        open={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" style={{ color: errorModalContent.title === 'Error' ? 'red' : 'green' }}>
            {errorModalContent.title}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            {errorModalContent.description}
          </Typography>
          <Button
            variant="contained"
            style={{backgroundColor: errorModalContent.title === 'Error' ? '#d2194a': "#1976d2"}}
          sx={{ mt: 2 }}

          onClick={() => setErrorModalOpen(false)}
          >
          Close
        </Button>
    </Box>
      </Modal >
    </Box >
  );
};

export default EndpointForm;
