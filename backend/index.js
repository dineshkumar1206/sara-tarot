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
const User = require('./models/User');

const seedAdminUser = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@saraatarot.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'adminpassword';

    const count = await User.count();
    if (count === 0) {
      await User.create({
        name: 'Saraa Tarot Admin',
        email: adminEmail,
        password: adminPassword
      });
      console.log('Admin user seeded into database.');
    }
  } catch (err) {
    console.error('Failed to seed admin user:', err);
  }
};

// Test DB connection and Sync
sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully.');
    // Sync models with alter: true to dynamically update column types
    return sequelize.sync({ alter: true });
  })
  .then(async () => {
    console.log('Database tables synchronized.');
    await seedAdminUser();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
