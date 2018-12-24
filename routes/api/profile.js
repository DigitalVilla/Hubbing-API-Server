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
 * @desc Get current user's profile
 * @access Private 
 */
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => { 
    Profile.findOne({user: req.user.id})
        .then(profile => {
            if (!profile)
                return res.status(404).json({noprofile:"There is no profile for this user"})
            res.json(profile)
        })
        .catch(err => res.status(400).json(err))
    }
);
/**
 * @route POST api/profile
 * @desc Create user profile
 * @access Private 
 */
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => { 
    // Get fields
    const fields = {};
    fields.user = req.user.id;
    if (req.body.handle) fields.handle = req.body.handle;
    if (req.body.company) fields.company = req.body.company;
    if (req.body.website) fields.website = req.body.website;
    if (req.body.location) fields.location = req.body.location;
    if (req.body.bio) fields.bio = req.body.bio;
    if (req.body.status) fields.status = req.body.status;
    if (req.body.github)
      fields.github = req.body.github;
    // Skills - Spilt into array
    if (typeof req.body.skills !== 'undefined') {
      fields.skills = req.body.skills.split(',');
    }
    // Social
    fields.social = {};
    if (req.body.youtube) fields.social.youtube = req.body.youtube;
    if (req.body.twitter) fields.social.twitter = req.body.twitter;
    if (req.body.facebook) fields.social.facebook = req.body.facebook;
    if (req.body.linkedin) fields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) fields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
        if (profile) {    // Update
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: fields },
            { new: true })
            .then(profile => res.json(profile));
        } else { // Create
          // Check if handle exists
          Profile.findOne({ handle: fields.handle }).then(profile => {
            if (profile) {
              errors.handle = 'That handle already exists';
              res.status(400).json(errors);
            }
  
            // Save Profile
            new Profile(fields).save().then(profile => res.json(profile));
          });
        }
      });
    }
);




module.exports = router;