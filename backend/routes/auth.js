const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'saraatarot_secret_key_123';

// @route   POST api/auth/register
// @desc    Register a new user (DISABLED)
router.post('/register', (req, res) => {
  return res.status(403).json({ message: 'Registration is disabled.' });
});

// @route   POST api/auth/login
// @desc    Authenticate admin and get token
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@saraatarot.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'adminpassword';

  if (email.toLowerCase() === adminEmail.toLowerCase() && password === adminPassword) {
    // Sign JWT
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });

    return res.json({
      token,
      user: {
        name: 'Saraa Tarot Admin',
        email: adminEmail
      }
    });
  } else {
    return res.status(400).json({ message: 'Invalid email or password' });
  }
});

module.exports = router;
