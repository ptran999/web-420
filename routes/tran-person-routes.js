/* 
    Title: tran-composer-routes.js
    Date: 02/8/2024
    Author: Phuong Tran
    Description: Set up the routes for the Person API
  
*/
//Import Mongoose 
const express = require('express');
//Assign a new router object for defining routes.
const router = express.Router();
//Import the composer model
const Person = require('../models/tran-person.js');

// openapi language used to describe the API via swagger
/**
 * @openapi
 * /api/persons:
 *   get:
 *     tags:
 *        - Persons
 *     operationId: findAllPersons
 *     description: API to find all persons.
 *     summary: Returns an array of persons.
 *     responses:
 *       '200':
 *         description: Array of person documents.
 *       '500':
 *         description: Server expectations.
 *       '501':
 *         description: MongoDB expectations.
 */

// route for findAllPersons method
router.get('/persons', async (req, res) => {
    try {
        Person.find({}, (err, persons) => {
            if(err) {
                console.log(err);
                res.status(501).send({
                    'message': 'MongoDB Exception'
                });
            } else {
                console.log(persons);
                res.json(persons)
            }
        });
    } catch(err) {
        res.status(500).send({
            'message': 'Server Exception'
        });
    }
});

// openapi language used to describe the API via swagger
/**
 * @openapi
 * /api/persons:
 *   post:
 *     tags:
 *       - Persons
 *     description: API for adding a new person object
 *     summary: Create a new person
 *     requestBody:
 *       description: Person's information
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                firstName:
 *                  type: string
 *                lastName:
 *                  type: string
 *                roles:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                       text:
 *                         type: string
 *                dependents:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                       firstName:
 *                         type: string
 *                       lastName:
 *                         type: string
 *                birthDate:
 *                  type: string
 *     responses:
 *       '200':
 *         description: Person added.
 *       '500':
 *         description: Server expectations.
 *       '501':
 *         description: MongoDB expectations.
 */

// route for createPerson method
router.post('/persons', async (req, res) => {
    try {
      // require the data for creating new Person
      const newPerson = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        roles: req.body.roles,
        dependents: req.body.dependents,
        birthDate: req.body.birthDate
      };
      // create a new document in the database using data from request body
      Person.create(newPerson, (err, person) => {
        if(err) {
            console.log(err);
            res.status(501).send({
                'message': 'MongoDB Exception'
            });
        } else {
            console.log(person);
            res.json(person);
        }
      })  
    } catch (err) {
        res.status(500).send({
            'message': 'Server Exception'
        });
    }
});

// Export the router
module.exports = router;