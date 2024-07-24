require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

console.log('MongoDB URI:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Category = mongoose.model('Category', categorySchema);

app.post('/api/categories', async (req, res) => {
  console.log('Received POST /api/categories');
  console.log('Request Body:', req.body);

  const category = new Category(req.body);
  try {
    const savedCategory = await category.save();
    console.log('Category saved:', savedCategory);
    res.status(201).send(savedCategory);
  } catch (e) {
    console.error('Error saving category:', e);
    res.status(400).send(e);
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).send(categories);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
