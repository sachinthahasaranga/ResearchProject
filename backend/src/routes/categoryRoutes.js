const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authMiddleware = require("../middleware/authMiddleware");

// Create a new category
router.post('/', authMiddleware, categoryController.createCategory);

// Get all categories
router.get('/', authMiddleware, categoryController.getAllCategories);

// Get a category by ID
router.get('/:id', authMiddleware, categoryController.getCategoryById);

// Update a category by ID
router.put('/:id', authMiddleware, categoryController.updateCategory);

// Delete a category by ID
router.delete('/:id', authMiddleware, categoryController.deleteCategory);

// Get categories by categoryType
router.get('/type/:type', authMiddleware, categoryController.getCategoriesByType);


module.exports = router;
