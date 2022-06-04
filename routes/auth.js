const express = require('express');
const router = express.Router();

// @route   GET api/v1/auth
// @desc    Get logged in user
// @access  Private
router.get('/', (req, res) => {
    res.send('Get logged in user');
})

// @route   POST api/v1/auth
// @desc    Auth user and get Token
// @access  Public
router.post('/', (req, res) => {
    res.send('Log in user details');
})

module.exports = router;