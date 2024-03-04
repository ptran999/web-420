/* 
    Title: tran-customer.js
    Author: Phuong Tran
    Date: 02/23/2024
    Description: Set the model for the database entries.
    Sources: https://github.com/buwebdev/web-420
*/

// import mongoose
const mongoose = require("mongoose");
// initialize the mongoose Schema Object
const Schema = mongoose.Schema;

// set a schema for embedded data in the customer model
let lineItemSchema = new Schema({
  name: {type: String, required: false, unique: false},
  price: {type: Number, required: false, unique: false},
  quantity: {type: Number, required: false, unique: false}
});

// set a schema for embedded data in the customer model
let invoiceSchema = new Schema({
  subtotal: {type: Number, required: false, unique: false},
  tax: {type: Number, required: false, unique: false},
  dateCreated: {type: String, required: false, unique: false},
  dateShipped: {type: String, required: false, unique: false},
  lineItems: [lineItemSchema]
});

// set the schema for the NodeShopper API
let customerSchema = new Schema({
  firstName: {type: String, required: true, unique: false},
  lastName: {type: String, required: true, unique: false},
  userName: {type: String, required: true, unique: false},
  invoices: [invoiceSchema]
});

// export the model for use externally
module.exports = mongoose.model("Customer", customerSchema);