const Category = require('./src/models/Category')
const Endpoint = require('./src/models/Endpoints')

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"))
app.use(express.urlencoded({extended : true}))

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


app.post('/api/endpoints', async (req, res) => {
  console.log('Request_Body:', req.body);

  const endpoint = new Endpoint(req.body);
  try {
    const savedEndpoint = await endpoint.save();
    console.log('Endpoint saved:', savedEndpoint);
    res.status(200).send(savedEndpoint);
  } catch (e) {
    console.error('Error saving Endpoint:', e);
    res.status(400).send(e);
  }
});




app.post('/api/categories', async (req, res) => {
  console.log('Received POST /api/categories');
  console.log('Request Body:', req.body);

  const category = new Category(req.body);
  try {
    const savedCategory = await category.save();
    console.log('Category saved:', savedCategory);
    res.status(200).send(savedCategory);
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



// app.get('/api/categories', async (req, res) => {
//   const { page = 1, limit = 5 } = req.query;

//   try {
//     const categories = await Category.find()
//       .limit(limit * 1)
//       .skip((page - 1) * limit)
//       .exec();

//     const count = await Category.countDocuments();

//     res.status(200).json({
//       categories,
//       totalPages: Math.ceil(count / limit),
//       currentPage: Number(page),
//     });
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });


app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (e) {
    res.status(500).send(e);
  }
});


