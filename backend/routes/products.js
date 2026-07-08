const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Product = require('../models/Product');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

const JWT_SECRET = process.env.JWT_SECRET || 'saraatarot_secret_key_123';

const formatProduct = (product) => {
  if (!product) return null;
  const p = product.toJSON();
  if (p.image) {
    if (Buffer.isBuffer(p.image)) {
      const str = p.image.toString('utf-8');
      if (str.startsWith('/') || str.startsWith('http') || str.startsWith('data:')) {
        p.image = str;
      } else {
        const mime = p.imageMime || 'image/jpeg';
        p.image = `data:${mime};base64,${p.image.toString('base64')}`;
      }
    }
  }
  return p;
};

// Middleware to verify Admin JWT Token
const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Administrator privileges required.' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

const DEFAULT_CRYSTALS = [
  {
    name: 'Rashi Crystal',
    price: 1500,
    type: 'Blessed & Energized',
    category: 'Rashi',
    desc: 'Harmonized for your specific zodiac sign (Rashi) to promote balance, aura cleansing, and positive celestial energy.',
    image: '/rashi.png',
    inclusions: [
      'Specially selected for your Rashi (Moon Sign)',
      'Spiritually cleansed and energized',
      'Couriered with sacred prasadham and care instructions'
    ]
  },
  {
    name: 'Dhanyog Crystal',
    price: 1800,
    type: 'Blessed & Energized',
    category: 'Dhanyog',
    desc: 'Attracts financial growth, stability, and wealth abundance. Perfect for offices, lockers, and cash registers.',
    image: '/dhanyog.png',
    inclusions: [
      'Attracts wealth and success vibrations',
      'Spiritually cleansed and energized by Saraa',
      'Couriered with sacred prasadham and activation guide'
    ]
  },
  {
    name: 'Crystal Bracelet',
    price: 1200,
    type: 'Blessed & Energized',
    category: 'Bracelet',
    desc: 'Elegant and powerful healing crystal bead bracelet to protect your aura and maintain daily emotional peace.',
    image: '/bracelet.png',
    inclusions: [
      'Premium hand-picked crystal beads',
      'Spiritually cleansed and energized for protection',
      'Couriered with sacred prasadham and care instructions'
    ]
  },
  {
    name: 'Karungali Malai / Bracelet',
    price: 1600,
    type: 'Blessed & Energized',
    category: 'Karungali',
    desc: 'Handcrafted black ebony wood beads to absorb negativity, enhance willpower, and shield against evil eye.',
    image: '/karungali.png',
    inclusions: [
      'Authentic black ebony (Karungali) wood',
      'Spiritually energized for shielding and confidence',
      'Couriered with sacred prasadham'
    ]
  },
  {
    name: 'Blessed Rudraksh Bead',
    price: 1000,
    type: 'Blessed & Energized',
    category: 'Rudraksh',
    desc: 'Sacred natural Rudraksh bead representing Lord Shiva. Instills deep mental peace, focus, and health.',
    image: '/rudraksh.png',
    inclusions: [
      'Sacred natural Rudraksh bead',
      'Spiritually energized for health and meditation focus',
      'Couriered with sacred prasadham and care guide'
    ]
  },
  {
    name: 'Energized Yantra',
    price: 2000,
    type: 'Blessed & Energized',
    category: 'Yantra',
    desc: 'Sacred geometry plate for homes/temples. Channellizes positive energy flows and repels dark vibrations.',
    image: '/yantra.png',
    inclusions: [
      'Sacred geometric copper/brass yantra plate',
      'Spiritually energized for home protection and harmony',
      'Couriered with sacred prasadham and installation details'
    ]
  },
  {
    name: 'Golden Pyrite',
    price: 1800,
    type: 'Blessed & Energized',
    category: 'Pyrite',
    desc: 'The golden stone of luck, abundance, and business growth. Ideal for work tables and wealth manifestation.',
    image: '/pyrite.png',
    inclusions: [
      'High-grade golden Pyrite crystal',
      'Spiritually energized for wealth attraction',
      'Couriered with sacred prasadham and care instructions'
    ]
  }
];

// @route   GET api/products
// @desc    Get all products (seeds database if empty)
router.get('/', async (req, res) => {
  try {
    let products = await Product.findAll();

    // If database is empty, seed defaults
    if (products.length === 0) {
      await Product.bulkCreate(DEFAULT_CRYSTALS);
      products = await Product.findAll();
    }

    let formattedProducts = products.map(p => formatProduct(p));

    // Optional query parameter filtering
    const { category } = req.query;
    if (category) {
      formattedProducts = formattedProducts.filter(p => p.category && p.category.toLowerCase() === category.toLowerCase());
    }

    res.json(formattedProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST api/products
// @desc    Create a new product (admin only)
router.post('/', verifyAdmin, upload.single('image'), async (req, res) => {
  const { name, price, type, category, desc, image, inclusions } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({ message: 'Product name, price, and category are required' });
  }

  try {
    let imageBuffer = null;
    let imageMime = null;

    if (req.file) {
      imageBuffer = req.file.buffer;
      imageMime = req.file.mimetype;
    } else if (image) {
      imageBuffer = Buffer.from(image);
      imageMime = null;
    }

    let parsedInclusions = inclusions;
    if (typeof inclusions === 'string') {
      try {
        parsedInclusions = JSON.parse(inclusions);
      } catch (e) {
        parsedInclusions = [];
      }
    }

    const newProduct = await Product.create({
      name,
      price: parseInt(price, 10),
      type,
      category,
      desc,
      image: imageBuffer,
      imageMime,
      inclusions: parsedInclusions
    });

    res.status(201).json(formatProduct(newProduct));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT api/products/:id
// @desc    Update a product (admin only)
router.put('/:id', verifyAdmin, upload.single('image'), async (req, res) => {
  const { name, price, type, category, desc, image, inclusions } = req.body;

  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = name !== undefined ? name : product.name;
    product.price = price !== undefined ? parseInt(price, 10) : product.price;
    product.type = type !== undefined ? type : product.type;
    product.category = category !== undefined ? category : product.category;
    product.desc = desc !== undefined ? desc : product.desc;

    if (req.file) {
      product.image = req.file.buffer;
      product.imageMime = req.file.mimetype;
    } else if (image !== undefined) {
      if (typeof image === 'string' && !image.startsWith('data:')) {
        product.image = Buffer.from(image);
        product.imageMime = null;
      }
    }

    if (inclusions !== undefined) {
      let parsedInclusions = inclusions;
      if (typeof inclusions === 'string') {
        try {
          parsedInclusions = JSON.parse(inclusions);
        } catch (e) {
          parsedInclusions = product.inclusions;
        }
      }
      product.inclusions = parsedInclusions;
    }

    await product.save();
    res.json(formatProduct(product));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE api/products/:id
// @desc    Delete a product (admin only)
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.destroy();
    res.json({ message: 'Product removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
