//////////////////////////////////////
// Dependencies
/////////////////////////////////////
const mongoose = require('mongoose');




/////////////////////////////////////
// Create a site schema
////////////////////////////////////
const siteSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    
    payload: [],
    status: {
        type: String,
        enum: ['success', 'Failed']
    },
});

module.exports = siteSchema;