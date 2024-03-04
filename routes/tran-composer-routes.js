/* 
    Title: tran-composer-routes.js
    Date: 02/03/2024
    Author: Phuong Tran
    Description: Routes for the composer App
    Source:  https://github.com/buwebdev/web-420/tree/master
*/

//Import Mongoose 
const express = require('express');
//Assign a new router object for defining routes.
const router = express.Router();
//Import the composer model
const Composer = require('../models/tran-composer');

// openapi language used to describe the API via swagger
/**
 * @openapi
 * /api/composers:
 *   get:
 *     tags:
 *       - Composers
 *     operationId: findAllComposers
 *     description: API for returning a list of composers from MongoDB Atlas
 *     summary: Returns a list of composers documents
 *     responses:
 *       "200":
 *        description: Composer documents
 *       "500":
 *         description: Server Exception
 *       "501":
 *         description: MongoDB Exception
*/

// route for findAllComposers method
router.get("/composers", async (req, res) => {
  try {
    Composer.find({}, (err, composers) => {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: "MongoDB Exception"
        });
      } else {
        console.log(composers);
        res.json(composers);
      }
    });
  } catch (err) {
    res.status(500).send({
      message: "Server Exception"
    });
  }
});

// openapi language used to describe the API via swagger
/** 
 * @openapi
 * /api/composers/{id}:
 *   description: The list of composers
 *   get:
 *     summary: Returns a composer document
 *     tags:
 *       - Composers
 *     operationId: findComposerById
 *     description: API for returning a single composer object from MongoDB
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The composerId requested by the user. 
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Composer document in JSON format
 *       "500":
 *         description: Server Exception
 *       "501":
 *         description: MongoDB Exception
*/

// route for findComposerById method
router.get("/composers/:id", async (req, res) => {
  try {
    Composer.findOne({_id: req.params.id}, (err, composer) => {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: "MongoDB Exception"
        });
      } else {
        console.log(composer);
        res.json(composer);
      }
    });
  } catch (err) {
    res.status(500).send({
      message: "Server Exception"
    });
  }
});

// openapi language used to describe the API via swagger
/**
 * createComposer
 * @openapi
 * /api/composers:
 *   post:
 *     summary: Creates a new composer
 *     tags:
 *       - Composers
 *     operationId: createComposer
 *     description: API for adding new composers objects
 *     requestBody:
 *       description: Composer's information
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       "200":
 *         description: User added
 *       "500":
 *         description: Server Exception
 *       "501":
 *         description: MongoDB Exception
*/

// route for createComposer method
router.post("/composers", async (req, res) => {
  try {
    const newComposer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName
    };
    await Composer.create(newComposer, (err, composer) => {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: "MongoDB Exception"
        });
      } else {
        console.log(composer);
        res.json(composer);
      }
    });
  } catch (err) {
    res.status(500).send({
      message: "Server Exception"
    });
  }
});

/**
 * @openapi
 * /api/composers/{id}:
 *   put:
 *     tags:
 *       - Composers
 *     description: Update a composer in the database by their ID.
 *     summary: Update a composer by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the composer to update.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Array of composer documents
 *       401:
 *         description: Invalid composer ID
 *       500:
 *         description: Server Exception
 *       501:
 *         description: MongoDB Exception
 */

router.put('/composers/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName } = req.body;

    Composer.findOne({ _id: id }, (err, composer) => {
      if(err) {
        console.log(err);
        res.status(501).send({
          'message': 'MongoDB Exception'
        });
      } else {
        if(composer) {
          composer.set({ firstName, lastName });
          composer.save();
          res.status(200).send(composer);
        } else {
          res.status(401).send({
            'message': 'Invalid Composer ID'
          });
        }
      }
    });
  } catch (err) {
      console.log(err);
      res.status(500).send({
        'message': 'Server Exception'
      });
    }
});

/**
 * @openapi
 * /api/composers/{id}:
 *   delete:
 *     tags:
 *       - Composers
 *     description: API for deleting a composer by their ID.
 *     summary: Deletes a composer by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the composer to delete. 
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Composer document
 *       "500":
 *         description: Server Exception
 *       "501":
 *         description: MongoDB Exception
 */
router.delete('/composers/:id', async(req, res) => {
  try {
    const { id } = req.params;
    Composer.findByIdAndDelete(id, (err, composer) => {
      if(err) {
        console.log(err);
        res.status(501).send({
          'message': 'MongoDB Exception'
        });
      } else {
        res.status(200).send(composer);
      }
    });
  } catch (err) {
    res.status(500).send({
      'message': 'Server Exception'
    });
  }
});
module.exports = router;