const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const authVerify = require('../middleware/auth');

const User = require('../models/User');

const { body, validationResult } = require('express-validator');

// @route   GET api/v1/auth
// @desc    Get logged in user
// @access  Private
router.get('/', authVerify, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error!");
    }
    
})

// @route   POST api/v1/auth
// @desc    Auth user and get Token
// @access  Public
router.post('/',
    body("email", "Email is required").isEmail(),
    body("password", "Password is required").not().isEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors : errors.array() });
        }
        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({msg:"Invalid Credentials"});
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ msg: "Invalid Credentials" });
            }

            const payload = {
                user: {
                    id: user.id,
                }
            }

            const jwtSecret = config.get('jwtSecret');
            
            jwt.sign(payload, jwtSecret, {
                expiresIn: "2 days"
            }, (err, token) => {
                if (err) {
                    throw err;
                }
                res.json({token})
            });
            
        }catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
})

module.exports = router;