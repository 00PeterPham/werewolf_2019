'use strict';

const express = require('express');
const router = express.Router();
const userService = require('./userService');

// GET /users/
router.route('/')
  .get(async (req, res, next) => {
    const email = req.query.email;
    
    if (email){
      try {
        const matchEmail = await userService.matchEmail(email);

        res.status(200).send(
          {
            data: matchEmail
          }
        )
      } catch (e) {
        next(e);
      }
    }else {
      try {
        // 1. Fetch all users from database
        const users = await userService.listUsers();
        // 2. Respond with list of users
        res.status(200).send({
          data: users,
        });
      } catch (e) {
        // 3. If error, send to the error handler
        next(e);
      }
    }
  });

  // GET all dead ppl /users/graveyard
  router.route('/graveyard')
    .get(async (req, res, next) => {
      try{
        const deadPplList = await userService.getGraveyard();

        res.status(200).send(
          {
            data: deadPplList
          }
        )
      } catch (e) {
        next(e);
      }
    })

// POST /users/
router.route('/')
  .post(async (req, res, next) => {
    // 1. Get data from request body
    // Format of the request for this destructuring would look like:
    /*
      {
        "userData": {
          "name": "Moby Dick",
          "author": "Herman Melville",
          "summary": "Really good user. It's about a lot of stuff"
        }
      }
    */
    // Play around with the destructuring if you would like the request to be sent in a different way
    const { userData } = req.body;
    try {
      // 2. Create user from data
      const user = await userService.createuser(userData);
      // 3. Respond with created user
      res.status(200).send({
        data: [user],
      });
    } catch (e) {
      // 4. If error, send to the error handler
      next(e);
    }
  });

// PATCH (edit 1 user) /users/
/** 
 * KILL user: query parameter: ?action=kill
 * UNKILL user: query parameter: ?action=unkill
 * user VOTED: query parameter: ?action=voted
*/
router.route('/edit/')
  .patch(async (req, res, next) => {
    console.log("req.body::")
    console.log(req.body);
    
    // 1. Get user to patch
    // const id = new mongodb.ObjectID(req.body._id);
    // const userID = { _id: id };
    //const { email, role } = req.body;
    // const userInfo = { email, role };

    const userInfo = req.body;
    
    // 1b. Get query parameter
    const action = req.query.action;

    try {
      // 2. editUser
      // const user = await userService.editUser(userInfo, action)
      const user = userInfo.map(async (userObj) => {
        const { email, role, timeOfDeath } = userObj;
        const userInfo = { email, role, timeOfDeath };

        await userService.editUser(userInfo, action);
      })

      //TO DO: return data of users that have been killed, currently returns a promise because async await returns a promise

      console.log("user::");
      console.log(user);

      
      // 3. Respond with patched user
      res.status(200).send({
        data: user,
      });
    } catch (e) {
      // 4. If error, send to the error handler
      next(e);
    }
  })

// Edit all users  -- NOT BEING USED: voting system hasn't been implemented
router.route('/edit/:param')
  .patch(async (req, res, next) => {
    // Get parameter
    const param = req.params.param;

    let user = null;

    try {
      // 2. edit All users
      user = await userService.editAllUsers(param)

      // 3. Respond with patched user
      res.status(200).send({
        data: [user],
      });
    } catch (e) {
      // 4. If error, send to the error handler
      next(e);
    }
  })

//slack request url -- NOT BEING USED: slack integration hasn't been implemented (EVENTS API which posts everytie a new msg is posted in the death channel)
router.route('/request-url')
  .post(async (req, res, next) => {
    console.log("SLACK API - REQUEST URL RESPONSE::")
    console.log(req.body);

    res.status(200).send({
      challenge: req.body.challenge,
    });
  })

exports.router = router;
