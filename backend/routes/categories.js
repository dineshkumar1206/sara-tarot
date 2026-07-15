const express = require('express');
const router = express.Router();
const multer = require('multer');

const { verifyAdmin } = require('../middlewares/authMiddleware');
const categoryController = require('../controllers/categoryController');

const upload = multer({ storage: multer.memoryStorage() });

// @route   GET api/categories
// @desc    Get all categories
router.get('/', categoryController.getCategories);

// @route   POST api/categories
// @desc    Create a new category (admin only)
router.post('/', verifyAdmin, upload.single('image'), categoryController.createCategory);

// @route   PUT api/categories/:id
// @desc    Update a category (admin only)
router.put('/:id', verifyAdmin, upload.single('image'), categoryController.updateCategory);

// @route   DELETE api/categories/:id
// @desc    Delete a category (admin only)
router.delete('/:id', verifyAdmin, categoryController.deleteCategory);

module.exports = router;
