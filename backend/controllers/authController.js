const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'saraatarot_secret_key_123';

// @route   POST api/auth/register
// @desc    Register a new user (DISABLED)
const register = (req, res) => {
  return res.status(403).json({ message: 'Registration is disabled.' });
};

// @route   POST api/auth/login
// @desc    Authenticate admin and get token
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    // Database-driven user authentication
    const user = await User.findOne({ where: { email: email.toLowerCase() } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Verify hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Sign JWT
    const token = jwt.sign({ id: user.id, role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  register,
  login
};
