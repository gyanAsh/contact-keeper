const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

const { body, validationResult } = require('express-validator');

// @route   POST api/v1/users
// @desc    Register a user
// @access  Public
router.post('/',
    body('name', "Name is required").not().isEmpty(),
    body('email', "Valid email is required").isEmail(),
    body('password', "Password of length atleast 6 is required").isLength({min:6})
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors : errors.array()});
        }
        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ msg: "User already exists" });
            }

            user = new User({ name, email, password });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

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

        } catch (error) {
            console.log(error.message);
            res.status(500).send("Server error !");
        }
})

module.exports = router;