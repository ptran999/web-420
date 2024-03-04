/* 
    Title: tran-node-shopper-routes.js
    Author: Phuong Tran
    Date: 02/23/2024
    Description: Set up the routes for the NodeShopper API.
    Sources: https://github.com/buwebdev/web-420
*/

// modules to require
const express = require("express");
const router = express.Router();
// the schema for the customers collection
const Customer = require("../models/tran-customer.js");

// openapi language used to describe the API via swagger
/** 
 * @openapi
 * /api/customers/{userName}/invoices:
 *   get:
 *     tags:
 *       - NodeShopper
 *     operationId: findAllInvoicesByUserName
 *     description: Find invoices by username.
 *     summary: Returns customer invoice information.
 *     parameters:
 *       - in: path
 *         name: userName
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       '200':
 *         description: Invoice document found.
 *         content:
 *           application/json:
 *             schema: 
 *               properties:
 *                 _id:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 userName:
 *                   type: string
 *                 invoices: 
 *                   type: array
 *                   items:
 *                     properties:
 *                       _id:
 *                         type: string
 *                       subtotal:
 *                         type: number
 *                       tax:
 *                         type: number
 *                       dateCreated:
 *                         type: string
 *                       dateShipped:
 *                         type: string
 *                       lineItems:
 *                         type: array
 *                         items:
 *                           properties:
 *                             _id:
 *                               type: string
 *                             name:
 *                               type: string
 *                             price: 
 *                               type: number
 *                             quantity:
 *                               type: number
 *       '500':
 *         description: Server expectations.
 *       '501': 
 *         description: MongoDB expectations.
 */
// route for findAllInvoicesByUserName method
router.get('/customers/:userName/invoices', async(req, res) => {
  try {
    let username = req.params.userName;
    // find and return an invoice document in the customers database
    Customer.findOne({userName: username}, (e, customer) => {
      if(e) {
        console.log(e);
        res.status(501).send({
          'message': `MongoDB Exception: ${e}`
        });
      }
      else {
        res.json(customer.invoices);
      }
    });
  }
  catch(e) {
    console.log(e);
    res.status(500).send({
      'message': `Server Exception: ${e.message}`
    });
  }
});

// openapi language used to describe the API via swagger
/** 
 * @openapi
 * /api/customers:
 *   post:
 *     tags:
 *       - NodeShopper
 *     operationId: createCustomer
 *     description: Create a new customer document.
 *     summary: Create a new customer.
 *     requestBody:
 *       description: Create a new customer document
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               userName:
 *                 type: string
 *       required: true 
 *     responses:
 *       '200':
 *         description: Customer added to MongoDB.
 *       '500':
 *         description: Server expectations.
 *       '501': 
 *         description: MongoDB expectations.
 */

// route for createCustomer method
router.post('/customers', async(req, res) => {
  try {
    // require the data for creating new Customer
    let newCustomer = new Customer({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      invoices: []
    });
    // create a new document in the database using data from request body
    Customer.create(newCustomer, (e, customer) => {
      if(e) {
        console.log(e);
        res.status(501).send({
          'message': `MongoDB Exception: ${e}`
        });
      }
      else {
        res.json(customer);
      }
    });
  }
  catch(e) {
    console.log(e);
    res.status(500).send({
      'message': `Server Exception: ${e.message}`
    });
  }
});

// openapi language used to describe the API via swagger
/** 
 * @openapi
 * /api/customers/{userName}/invoices:
 *   post:
 *     tags:
 *       - NodeShopper
 *     operationId: createInvoiceByUserName
 *     description: Create a new invoice for a customer document.
 *     summary: Create an invoice to add to a customer document.
 *     parameters:
 *       - in: path
 *         name: userName
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       description: Create a new invoice for a customer document.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subtotal:
 *                 type: number
 *               tax:
 *                 type: number
 *               dateCreated:
 *                 type: string
 *               dateShipped:
 *                 type: string
 *               lineItems:
 *                 type: array
 *                 items:
 *                   properties:
 *                     name:
 *                       type: string
 *                     price: 
 *                       type: number
 *                     quantity:
 *                       type: number
 *       required: true 
 *     responses:
 *       '200':
 *         description: Created invoice.
 *       '500':
 *         description: Server expectations.
 *       '501': 
 *         description: MongoDB expectations.
 */

// route for createInvoiceByUserName  method
router.post('/customers/:userName/invoices', async(req, res) => {
  try {

    let username = req.params.userName;
    // create a new document in the database using data from request body
    Customer.findOne({userName: username}, (e, customer) => {
      if(e) {
        console.log(e);
        res.status(501).send({
          'message': `MongoDB Exception: ${e}`
        });
      }
      else {
        res.status(200).send({
          'message': 'Invoice added.'
        });

        // require the data for creating invoices n a customer document
        let newInvoice = {
          subtotal: req.body.subtotal,
          tax: req.body.tax,
          dateCreated: req.body.dateCreated,
          dateShipped: req.body.dateShipped,
          lineItems: req.body.lineItems
        };

        // push the required data into the customer invoice array
        customer.invoices.push(newInvoice);
        customer.save();
      }
    });
  }
  catch(e) {
    console.log(e);
    res.status(500).send({
      'message': `Server Exception: ${e.message}`
    });
  }
});

// export the module for external use
module.exports = router;