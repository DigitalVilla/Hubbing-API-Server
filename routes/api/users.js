// authentication credentials
const express = require('express');
const router = express.Router();
// Load user model
const User = require('../../models/User');

/**
 * @route GET api/users/test
 * @desc test for the route
 * @access Public 
 */
router.get('/test', (req,res) => res.json({msg:"Users is running"}));

/**
 * @route GET api/users/register
 * @desc  Register new user
 * @access Public 
 */
router.post('/register', (req,res) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if(user)  // if users exist warn the sender
            return res.status(400).json({email: "Email already exists"});
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            avatar
        })

    })
} );


module.exports = router;