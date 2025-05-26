const Category = require('../models/categoryModel');
const multer = require("multer");
const cloudinary = require("../config/cloudinaryConfig");

const upload = multer({ storage: multer.memoryStorage() }).single('backgroundImage');

const uploadToCloudinary = (file, folder = "category-images") => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    ).end(file.buffer);
  });
};


exports.createCategory = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(500).json({ message: "File upload error", err });

    try {
      const { categoryName, callingName, description, categoryType } = req.body;

      // Validate categoryType
      const validCategoryTypes = ["paper", "listing", "lecture", "story", "reading"];
      if (!validCategoryTypes.includes(categoryType)) {
        return res.status(400).json({ message: "Invalid categoryType. Allowed values: paper, listing, lecture, story, reading" });
      }

      // Cloudinary upload if image present
      let backgroundImage = "";
      if (req.file) {
        backgroundImage = await uploadToCloudinary(req.file, "category-images");
      }

      const category = new Category({ categoryName, callingName, description, backgroundImage, categoryType });
      const savedCategory = await category.save();
      res.status(201).json({ message: "Category created successfully!", category: savedCategory });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
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
  upload(req, res, async (err) => {
    if (err) return res.status(500).json({ message: "File upload error", err });

    try {
      const { categoryName, callingName, description, categoryType } = req.body;

      // Validate categoryType if provided
      if (categoryType) {
        const validCategoryTypes = ["paper", "listing", "lecture", "story", "reading"];
        if (!validCategoryTypes.includes(categoryType)) {
          return res.status(400).json({ message: "Invalid categoryType. Allowed values: paper, listing, lecture, story, reading" });
        }
      }

      // Find existing category
      const existingCategory = await Category.findById(req.params.id);
      if (!existingCategory) {
        return res.status(404).json({ message: "Category not found" });
      }

      let updatedData = { categoryName, callingName, description, categoryType };

      // Cloudinary upload if new image present
      if (req.file) {
        updatedData.backgroundImage = await uploadToCloudinary(req.file, "category-images");
      } else {
        updatedData.backgroundImage = existingCategory.backgroundImage;
      }

      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        updatedData,
        { new: true, runValidators: true }
      );

      res.status(200).json({ message: "Category updated successfully!", category: updatedCategory });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
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
