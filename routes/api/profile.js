//location, bioe metrics
const express = require('express');
const router = express.Router();

/**
 * @route GET api/profile/test
 * @desc test for the route
 * @access Public 
 */
router.get('/test', (req,res) => {
    console.log("profile accessed by: ", req.headers)
    res.json({msg:"Profile is running"})
    
});


module.exports = router;