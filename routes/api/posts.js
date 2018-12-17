const express = require('express');
const router = express.Router();

/**
 * @route GET api/posts/test
 * @desc test for the route
 * @access Public 
 */
router.get('/test', (req,res) => res.json({msg:"Posts is running"}));

module.exports = router;