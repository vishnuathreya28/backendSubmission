const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const { authenticateToken } = require('./middleware/authentication');
const relationRoutes = require('./routes/relationRoutes');
const characterRoutes = require('./routes/characterRoutes');

const app = express();
const PORT = 3000; // Change this to your desired port number

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1/Internship_Backend', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Middleware to parse incoming requests' body
app.use(bodyParser.json());

// Example root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the screenplay API!' });
});

// Routes for relations (CRUD operations)
app.use('/relations', relationRoutes);

// Routes for characters (CRUD operations)
app.use('/characters', characterRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});