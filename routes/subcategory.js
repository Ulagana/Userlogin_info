const express = require('express');
const router = express.Router();
const Subcategory = require('../models/Subcategory');

// Create a new subcategory
router.post('/', async (req, res) => {
    try {
        const subcategory = new Subcategory(req.body);
        await subcategory.save();
        res.status(201).json(subcategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all subcategories
router.get('/', async (req, res) => {
    try {
        const subcategories = await Subcategory.find().populate('catId');
        res.json(subcategories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a subcategory
router.put('/:id', async (req, res) => {
    try {
        const subcategory = await Subcategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(subcategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a subcategory
router.delete('/:id', async (req, res) => {
    try {
        await Subcategory.findByIdAndDelete(req.params.id);
        res.json({ message: 'Subcategory deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
