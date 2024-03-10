/*
    Title: tran-team-routes.js
    Author: Phuong Tran
    Date: 03/06/2024
    Description: Set up the routes for the Team API.
*/

// Import the express framework
const express = require('express');

// Create and assign the router variable
const router = express.Router();

// Import the teams model
const Teams = require('../models/tran-teams');

// openapi language used to describe the API via swagger
/** 
 * @openapi
 * /api/teams:
 *   get:
 *     tags:
 *       - Teams
 *     operationId: findAllTeams
 *     description: API to find teams.
 *     summary: returns an array of teams.
 *     responses:
 *       '200':
 *         description: Array of team documents.
 *         content:
 *           application/json:
 *             schema: 
 *               type: array
 *               items:
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   mascot:
 *                     type: string
 *                   players: 
 *                     type: array
 *                     items:
 *                       properties:
 *                         _id:
 *                           type: string
 *                         firstName:
 *                           type: string
 *                         lastName:
 *                           type: string
 *                         salary:
 *                           type: number
 *       '500':
 *         description: Server expectations.
 *       '501': 
 *         description: MongoDB expectations.
 */

// route for findAllTeams method
router.get('/teams', async(req, res) => {
    try {
      // find and return all documents in the people database
      Team.find({}, (e, teams) => {
        if(e) {
          console.log(e);
          res.status(501).send({
            'message': `MongoDB Exception: ${e}`
          });
        }
        else {
          res.json(teams);
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
   * /api/teams/{id}/players:
   *   post:
   *     tags:
   *       - Teams
   *     operationId: assignPlayerToTeam
   *     description: Add a player to a team by Id.
   *     summary: Add players to a team document.
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *     requestBody:
   *       description: Add players to a team document.
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               firstName:
   *                 type: string
   *               lastName:
   *                 type: string
   *               salary:
   *                 type: number
   *       required: true
   *     responses:
   *       '200':
   *         description: Player document.
   *         content:
   *           application/json:
   *             schema: 
   *               type: object
   *               properties:
   *                 _id:
   *                   type: string
   *                 firstName:
   *                   type: string
   *                 lastName:
   *                   type: string
   *                 salary:
   *                   type: number
   *       '401':
   *         description: Invalid teamId.
   *       '500':
   *         description: Server exception.
   *       '501': 
   *         description: MongoDB exceptions.
   */
  // route for assignPlayerToTeam method
  router.post('/teams/:id/players', async(req, res) => {
    try {
      // request the id 
      let teamId = req.params.id;
      // find a team using the provided id
      Team.findOne({_id: teamId}, (e, team) => {
        // if the team exists
        if(team) {
          // some database error
          if(e) {
            console.log(e);
            res.status(501).send({
              'message': `MongoDB Exception: ${e}`
            });
          }
          // successfully found
          else {
            res.status(200).send({
              'message': 'Player document.'
            });
            // set new information in the document
            team.players.push({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              salary: req.body.salary
            });
            // write to the document
            team.save((e, updatedPlayer) => {
              if(e) {
                console.log(e);
                res.json(updatedPlayer);
              }
              else {
                res.json(updatedPlayer);
              }
            });
          }
        }
        if(!team) {
          // send the 401 message
          res.status(401).send({
            'message': 'Invalid teamId.'
          });
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
   * /api/teams/{id}/players:
   *   get:
   *     tags:
   *       - Teams
   *     operationId: findAllPlayersByTeamId
   *     description: Display players by team Id.
   *     summary: Display a teams player documents.
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *     responses:
   *       '200':
   *         description: Array of player documents.
   *         content:
   *           application/json:
   *             schema: 
   *               type: array
   *               items:
   *                 properties:
   *                   _id:
   *                     type: string
   *                   firstName:
   *                     type: string
   *                   lastName:
   *                     type: string
   *                   salary:
   *                     type: number
   *       '401':
   *         description: Invalid teamId.
   *       '500':
   *         description: Server exception.
   *       '501': 
   *         description: MongoDB exceptions.
   */
  // route for findAllPlayersByTeamId method
  router.get('/teams/:id/players', async(req, res) => {
    try {
      // request the id 
      let teamId = req.params.id;
      // find a team using the provided id
      Team.findOne({_id: teamId}, (e, team) => {
        // if the team exists
        if(team) {
          // some database error
          if(e) {
            console.log(e);
            res.status(501).send({
              'message': `MongoDB Exception: ${e}`
            });
          }
          // successfully found
          else {
            res.json(team.players);
          }
        }
        if(!team) {
          // send the 401 message
          res.status(401).send({
            'message': 'Invalid teamId.'
          });
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
   * /api/teams/{id}:
   *   delete:
   *     tags:
   *       - Teams
   *     operationId: deleteTeamById
   *     description: Delete a team by Id.
   *     summary: Delete a team document.
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *     responses:
   *       '200':
   *         description: Deleted team document.
   *       '500':
   *         description: Server expectations.
   *       '501': 
   *         description: MongoDB expectations.
   */
  // route for deleteTeamById method
  router.delete('/teams/:id', (req, res) => {
    try {
      // request id
      let teamId = req.params.id;
      // find document using the request id and delete
      Team.findByIdAndDelete({_id: teamId}, (e, team) => {
          if (e) {
              console.log(e);
              res.status(501).send({
                  'message': `MongoDB Exception: ${e}`
              });
          } 
          // if no errors occur respond with successful deletion
          else if(team) {
            res.status(200).send({
              'message': 'Deleted team document.'
            });
          }
      });
    } catch(e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        });
    }
  });
  
  // export the module for external use
  module.exports = router;