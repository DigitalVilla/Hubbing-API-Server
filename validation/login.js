const validator = require("validator");
const isEmpty = require('./utils');


//validates the req body
module.exports = function validateInput(data) {
    let errors = {};

    if (isEmpty(data.email) || !validator.isEmail(data.email))
        errors.email = "Email must be valid";

    if (isEmpty(data.password))
        errors.password = "Password must be valid";

    return {
        errors,
        isValid: isEmpty(errors)
    }
}