const express = require('express');
const router = express.Router();
const multer = require('multer');

const { verifyAdmin } = require('../middlewares/authMiddleware');
const productController = require('../controllers/productController');

const upload = multer({ storage: multer.memoryStorage() });

// @route   GET api/products
// @desc    Get all products
router.get('/', productController.getProducts);

// @route   POST api/products
// @desc    Create a new product (admin only)
router.post('/', verifyAdmin, upload.single('image'), productController.createProduct);

// @route   PUT api/products/:id
// @desc    Update a product (admin only)
router.put('/:id', verifyAdmin, upload.single('image'), productController.updateProduct);

// @route   DELETE api/products/:id
// @desc    Delete a product (admin only)
router.delete('/:id', verifyAdmin, productController.deleteProduct);

module.exports = router;
