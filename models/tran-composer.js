/* 
    Title: tran-composer.js
    Date: 02/03/2024
    Author: Phuong Tran
    Description: Composer Model
*/

//Import Mongoose 
const mongoose = require('mongoose');
//Create the variable Schema
const Schema = mongoose.Schema;
//Create new schema with fields
const composerSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
});
//Name the model “Composer” and export it using module.exports
module.exports = mongoose.model('Composer', composerSchema);