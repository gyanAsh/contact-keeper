const express = require('express');
const router = express.Router();
const authVerify = require('../middleware/auth');
const {body,validationResult} = require('express-validator')

const Contact = require('../models/Contact');

// @route   GET api/v1/contacts
// @desc    Get all user contacts
// @access  Private
router.get('/', authVerify, async (req, res) => {
    try {
        const contact = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        res.json(contact);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

// @route   POST api/v1/contacts
// @desc    Add new contact
// @access  Private
router.post('/', [authVerify, [
    body('name', 'Name is required').not().isEmail(),
    body('email', 'Email is required').isEmail()
]], async (req, res) => {

    const errors = validationResult(req, res);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
        const newUser = new Contact({ name, email, phone, type, user: req.user.id });
        const contact = await Contact.save(newUser);
        res.json(contact);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
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