const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');

const app = express();

// --- UPDATE: Configured CORS for your frontend URLs ---
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174',
  'https://amigowebster.in',
  'http://amigowebster.in',
  'https://www.amigowebster.in',
  'http://www.amigowebster.in',
  'https://sara-tarot.vercel.app'
];
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or postman)
    if (!origin) return callback(null, true);
    
    // Check if origin is allowed
    const isAllowed = allowedOrigins.includes(origin) || 
                      origin.startsWith('http://localhost:') || 
                      origin.endsWith('.vercel.app') || 
                      origin.endsWith('amigowebster.in');
                      
    if (isAllowed) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// --- UPDATE: Simplified routes for cPanel ---
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

// Start the server immediately so it listens on the port (preventing 503 errors on live hosting)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  
  // Connect and sync the database asynchronously
  sequelize.authenticate()
    .then(() => {
      console.log('Database connected successfully.');
      return sequelize.sync({ alter: true });
    })
    .then(async () => {
      console.log('Database tables synchronized.');
      await seedAdminUser();
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
      console.error('Please verify your live environment variables or cPanel database configuration.');
    });
});