const express = require('express');
const router = express.Router();

// @route   GET api/v1/contacts
// @desc    Get all user contacts
// @access  Private
router.get('/', (req, res) => {
    res.send('Get all user contacts');
})

// @route   POST api/v1/contacts
// @desc    Add new contact
// @access  Private
router.post('/', (req, res) => {
    res.send('Add new Contact');
})

// @route   PUT api/v1/contacts:id
// @desc    Update existing contact
// @access  Private
router.put('/:id', (req, res) => {
    res.send('Update existing contact');
})

// @route   DELETE api/v1/contacts:id
// @desc    Delete existing contact
// @access  Private
router.delete('/:id', (req, res) => {
    res.send('Delete existing contact');
})

module.exports = router;