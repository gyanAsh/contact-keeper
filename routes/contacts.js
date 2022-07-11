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
        const newContact = new Contact({ name, email, phone, type, user: req.user.id });
        const contact = await newContact.save();
        res.json(contact);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

// @route   PUT api/v1/contacts:id
// @desc    Update existing contact
// @access  Private
router.put('/:id', authVerify, async (req, res) => {
    const { name, email, phone, type } = req.body;
    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;
    
    try {
        let contact = await Contact.findById(req.params.id);
        
        if (!contact) {
            return res.status(404).send("Contact not found");
        }
        if (req.user.id !== contact.user.toString()) {
            return res.status(401).send("Unauthorized User");
        }

        contact = await Contact.findByIdAndUpdate(req.params.id,
            { $set: contactFields },
            {new : true}
        )

        return res.json(contact);
        
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Server Error");
    }
})

// @route   DELETE api/v1/contacts:id
// @desc    Delete existing contact
// @access  Private
router.delete('/:id',authVerify,async(req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ msg: "Contact not found" });
        }
        if (req.user.id !== contact.user.toString()) {
            return res.status(401).json({ msg: "Unauthorized User" });
        }

        await Contact.findByIdAndDelete(req.params.id);
        res.json({ msg: "Contact Removed" });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
    }
    
})

module.exports = router;