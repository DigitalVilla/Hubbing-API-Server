// authentication credentials
const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const key = require('../../config/keys').customKey;


/**
 * @route GET api/users/test
 * @desc test for the route
 * @access Public 
 */
router.get('/test', (req, res) => res.json({
    msg: "Users is running"
}));

/**
 * @route GET api/users/register
 * @desc  Register new user
 * @access Public 
 */
router.post('/register', (req, res) => {
    User.findOne({email: req.body.email })
        .then(user => {
            if (user) // if users exist warn the sender
                return res.status(400).json({
                    email: "Email already exists"
                });

            const avatar = gravatar.url(req.body.email, {
                s: '200', //size
                r: 'pg', //rating
                d: 'mm' //default
            });

            // create user
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar
            })

            // encrypt password
            //  https://medium.com/@paulrohan/how-bcryptjs-works-90ef4cb85bf4
            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then((user) => res.json(user))
                        .catch((err) => console.log(err))
                })
            })

        })
});


/**
 * @route GET api/users/login
 * @desc  Login user / send JWT token
 * @access Public 
 */

 router.post('/login', (req,res ) => {
     //get params
     const email = req.body.email;
     const password = req.body.password;
    // find user in DB 
    User.findOne({email})
    .then(user => {
        //check user
        if (!user)
            return res.status(404).json({email: "User not found"});
        
        //check password
        bcrypt.compare(password, user.password ) 
        .then(isMatch => {
            if (!isMatch) 
                return res.status(400).json({password: "Invalid password"});
            
            //content to return with jwt
            const payload = {id: user.id, name: user.name, avatar: user.avatar}
           
                // users matched return web token for secure route jwt
            jwt.sign(payload, key, {expiresIn: 3600}, (err,token) => {
                res.json({
                    success: true,
                    token: 'Bearer '+token
                })

            });

            

        })

    })

 })

module.exports = router;