const Category = require('../models/categoryModel'); // Adjust the path to the Category model

// Create a new category
exports.createCategory = async (req, res) => {
    try {
        const { categoryName, callingName, description, backgroundImage, categoryType } = req.body;

        // Validate categoryType
        const validCategoryTypes = ["paper", "listing", "lecture", "story"];
        if (!validCategoryTypes.includes(categoryType)) {
            return res.status(400).json({ message: "Invalid categoryType. Allowed values: paper, listing, lecture, story." });
        }

        const category = new Category({ categoryName, callingName, description, backgroundImage, categoryType });
        const savedCategory = await category.save();
        res.status(201).json({ message: "Category created successfully!", category: savedCategory });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a category by ID
exports.updateCategory = async (req, res) => {
    try {
        const { categoryName, callingName, description, backgroundImage, categoryType } = req.body;

        // Validate categoryType if provided
        if (categoryType) {
            const validCategoryTypes = ["paper", "listing", "lecture", "story"];
            if (!validCategoryTypes.includes(categoryType)) {
                return res.status(400).json({ message: "Invalid categoryType. Allowed values: paper, listing, lecture, story." });
            }
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { categoryName, callingName, description, backgroundImage, categoryType },
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ message: "Category updated successfully!", category: updatedCategory });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a category by ID
exports.deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ message: "Category deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
