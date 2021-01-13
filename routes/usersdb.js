const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  const { addUser, getUserWithEmail } = require('../public/scripts/helpers');

  router.post("/", (req, res) => {

      // Create function for registration and another for login

      // Registration
      if (!req.body.email || !req.body.password) {
        res.status(400).send('<h2>400 - Email or password left empty</h2>');
      } else if (getUserWithEmail(db, req.body.email) !== null) {
        res.status(400).send('<h2>400 - Email is taken</h2>');
      } else {
        addUser(db, req.body);
        // req.session.user_id = req.params.id;
        console.log(req.session);
        console.log(req.params);
        res.redirect("/");
      }

  });

  return router;
};
