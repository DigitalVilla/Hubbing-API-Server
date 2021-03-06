const validator = require("validator");
const isEmpty = require('./utils');


//validates the req body
module.exports = function validateInput(data) {
    let errors = {};

    // data.name = !isEmpty(data.name)? data.name:'';
    // data.email = !isEmpty(data.email)? data.email:'';
    // data.password = !isEmpty(data.password)? data.password:'';
    // data.password2 = !isEmpty(data.password2)? data.password2:'';

    if (isEmpty(data.name) || !validator.isLength(data.name, {min: 2, max: 30}))
        errors.name = "Name must be between 2 and 30 characters";
        
    if (isEmpty(data.email) || !validator.isEmail(data.email))
        errors.email = "Email must be a valid email";

    if (isEmpty(data.password) || !validator.isLength(data.password, {min: 8, max: 30}))
        errors.password = "Password must be at least 8 characters";
  
    if (isEmpty(data.password2) || !validator.equals(data.password, data.password2))
        errors.password2 = "Passwords must match";

    return {
        errors,
        isValid: isEmpty(errors)
    }
} 