const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));

// Root Route
app.get('/', (req, res) => {
  res.send('Saraa Tarot API is running...');
});

const PORT = process.env.PORT || 5000;

// Test DB connection and Sync
sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully.');
    // Sync models with alter: true to dynamically update column types
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('Database tables synchronized.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
