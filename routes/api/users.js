// authentication credentials
const express = require('express');
const router = express.Router();

/**
 * @route GET api/users/test
 * @desc test for the route
 * @access Public 
 */
router.get('/test', (req,res) => res.json({msg:"Users is running"}));


module.exports = router;