/* 
    Title: tran-user.js
    Author: Phuong Tran
    Date: 02/16/2024
    Description: Users Model
    Sources: https://github.com/buwebdev/web-420
*/

// Import the mongoose Framework
const mongoose = require('mongoose');
// initialize the mongoose Schema Object
const Schema = mongoose.Schema;
// set the schema for the API
const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    emailAddress: [String]
});

// Export the user's model
module.exports = mongoose.model('User', userSchema);