//location, bioe metrics
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../../models/Profile');
const User = require('../../models/User');


/**
 * @route GET api/profile/test
 * @desc test for the route
 * @access Public 
 */
router.get('/test', (req, res) => {
    console.log("profile accessed by: ", req.headers)
    res.json({
        msg: "Profile is running"
    })
});

/**
 * @route GET api/profile
 * @desc Get current users profile
 * @access Private 
 */
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => { 
    Profile.findOne({user: req.user.id})
        .then(profile => {
            if (!profile)
                return res.status(404).json({profile:"There is no profile for this user"})
            res.json(profile)
        })
        .catch(err => res.status(400).json(err))
    }
);




module.exports = router;