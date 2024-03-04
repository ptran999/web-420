/* 
    Title: tran-composer.js
    Date: 02/09/2024
    Author: Phuong Tran
    Description: Set the model for the database entries
*/

// import mongoose
const mongoose = require("mongoose");
// initialize the mongoose Schema Object
const Schema = mongoose.Schema;

// set a schema for embedded data in the Person model
let roleSchema = new Schema({
  text:  String,
});

// set a schema for embedded data in the Person model
let dependentSchema = new Schema({
  firstName: String, 
  lastName:  String
});

// set the model for documents in the Persons API
let personSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  // use the roleSchema to determine roles structure
  roles: [roleSchema],
  // use the dependentSchema to determine dependents structure
  dependents: [dependentSchema],
  birthDate:  String
});

// export the model for use externally
module.exports = mongoose.model("Person", personSchema);