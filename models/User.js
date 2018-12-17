const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Crete Schema
const UserSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    
}) 

// set to a variable and export schema
module.exports = User = mongoose.model('users', UserSchema) // set name of table and its schema 