const Listing = require('../models/listingModel'); // Adjust the path as necessary

// Create a new Listing
exports.createListing = async (req, res) => {
    try {
        const listing = new Listing(req.body);
        const savedListing = await listing.save();
        res.status(201).json(savedListing);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all Listings
exports.getAllListings = async (req, res) => {
    try {
        const listings = await Listing.find().populate('QnA').populate('category');
        res.status(200).json(listings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single Listing by ID
exports.getListingById = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id).populate('QnA').populate('category');
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        res.status(200).json(listing);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a Listing
exports.updateListing = async (req, res) => {
    try {
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedListing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        res.status(200).json(updatedListing);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a Listing
exports.deleteListing = async (req, res) => {
    try {
        const deletedListing = await Listing.findByIdAndDelete(req.params.id);
        if (!deletedListing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        res.status(200).json({ message: 'Listing deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
