///////////////////////////////////////
// Dependencies
///////////////////////////////////////
const mongoose = require('mongoose');




////////////////////////////////////////
// Create User Schema
////////////////////////////////////////
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true
    }
});

module.exports = userSchema;