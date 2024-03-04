/* 
    Title: tran-session-routes.js
    Author: Phuong Tran
    Date: 02/16/2024
    Description: Set up the routes for API.
*/

// modules to require
const express = require("express");
const router = express.Router();
// the schema for the users collection
const User = require("../models/tran-user.js");
// Import the bcrypt framework
const bcrypt = require('bcryptjs');
// Create variable saltRound equal to 10
const saltRounds = 10;

// openapi language used to describe the API via swagger
/** 
 * @openapi
 * /api/signup:
 *   post:
 *     tags:
 *       - NodeSecurity
 *     operationId: signup
 *     description: Create a user document.
 *     summary: Create a new user.
 *     requestBody:
 *       description: Create a new user document
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *               emailAddress:
 *                 type: string
 *       required: true 
 *     responses:
 *       '200':
 *         description: Registered user.
 *       '401':
 *         description: Username is already in use.
 *       '500':
 *         description: Server expectations.
 *       '501': 
 *         description: MongoDB expectations.
 */

// route for signup method
router.post('/signup', async (req, res) => {
  try {
      // Get the userName, password, and emailAddress from the req.body
      const { userName, password, emailAddress } = req.body;
      // Find the user
      const user = await User.findOne({ userName: userName} );
      // If the user doesn't exist
      if(!user) {
        // require the userName, password, and emailAddress
          const newRegisteredUser = {
              userName: userName,
              password: bcrypt.hashSync(password, saltRounds),
              emailAddress: emailAddress
          };
          await User.create(newRegisteredUser);
          return res.status(200).send('Registered User');
      // Else if the user already exists
      } else {
            // send the 401 message
          return res.status(401).send('Username is already in use');
      }
  } catch (err) {
      if(err.name == 'MongoError') {
         // send the 501 message
          return res.status(501).send('MongoDB Exception');
      }
      return res.status(500).send('Server Exception');
  }
});

// openapi language used to describe the API via swagger
/** 
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - NodeSecurity
 *     operationId: signup
 *     description: Create a user document.
 *     summary: Login as a user.
 *     requestBody:
 *       description: Create a new user document
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *               emailAddress:
 *                 type: string
 *       required: true 
 *     responses:
 *       '200':
 *         description: Registered user.
 *       '401':
 *         description: Username is already in use.
 *       '500':
 *         description: Server expectations.
 *       '501': 
 *         description: MongoDB expectations.
 */

// route for login method
router.post('/login', async(req, res) => {
  try {
       // check the username first
      const { userName, password } = req.body;
      // Find the user
      const user = await User.findOne({ userName: userName });
      // If the user exist
      if(user) {
          // check the password
          let passwordIsValid = bcrypt.compareSync(password, user.password);
          // If the password matches
          if(passwordIsValid) {
              // send the 200 message
              return res.status(200).send('User logged in');
          // If the password doesn't match
          } else {
              // send the 401 message
              return res.status(401).send('Invalid username and/or password');
          }
      // Else if the user doesn't exist
      } else {
          // send the 401 message
          return res.status(401).send('Invalid username and/or password');
      }
  } catch (err) {
      if(err.name == 'MongoError') {
          return res.status(501).send('MongoDB Exception');
      }
      return res.status(500).send('Server Exception');
  }
});

// Export the router
module.exports = router;