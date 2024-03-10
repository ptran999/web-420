/*
    Title: tran-teams.js
    Author: Phuong Tran
    Date: 03/06/2024
    Description: Set the model for the database entries.
*/

// Import mongoose framework
const mongoose = require('mongoose');

// Create Schema variable
const Schema = mongoose.Schema;

// Create player schema
const playerSchema = new Schema({
    firstName: String,
    lastName: String,
    salary: Number
});

// Create team schema
const teamSchema = new Schema({
    name: String,
    mascot: String,
    players: [playerSchema]
});

// Export the team model
module.exports = mongoose.model('Teams', teamSchema);