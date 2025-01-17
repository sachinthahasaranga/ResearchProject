const Category = require('../models/categoryModel'); // Adjust the path to the Category model as needed

// Create a new category
exports.createCategory = async (req, res) => {
    try {
        const category = new Category(req.body); // Create a new category instance
        const savedCategory = await category.save(); // Save the category to the database
        res.status(201).json(savedCategory); // Respond with the saved category
    } catch (error) {
        res.status(400).json({ message: error.message }); // Handle errors
    }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find(); // Fetch all categories
        res.status(200).json(categories); // Respond with the list of categories
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};

// Get a single category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id); // Find category by ID
        if (!category) {
            return res.status(404).json({ message: 'Category not found' }); // Handle not found
        }
        res.status(200).json(category); // Respond with the category
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};

// Update a category by ID
exports.updateCategory = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Return the updated document
            runValidators: true, // Run schema validations
        });
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' }); // Handle not found
        }
        res.status(200).json(updatedCategory); // Respond with the updated category
    } catch (error) {
        res.status(400).json({ message: error.message }); // Handle errors
    }
};

// Delete a category by ID
exports.deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id); // Delete the category by ID
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' }); // Handle not found
        }
        res.status(200).json({ message: 'Category deleted successfully' }); // Respond with success
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};
