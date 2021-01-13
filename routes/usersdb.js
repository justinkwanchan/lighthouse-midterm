const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  const { generateRandomString, addUser, getUserWithEmail } = require('../public/scripts/helpers');

  // Register a new email
  router.post("/", (req, res) => {
    db.query(`SELECT * FROM users;`).then(data => {
      // Create function for registration and another for login

      // Registration
      if (!req.body.email || !req.body.password) {
        res.status(400).send('<h2>400 - Email or password left empty</h2>');
      } else if (getUserWithEmail(data.rows, req.body.email) !== null) {
        res.status(400).send('<h2>400 - Email is taken</h2>');
      } else {
        const newSessionID = generateRandomString();
        const userData = { newSessionID, ...req.body };

        addUser(db, userData);
        req.session.user_id = newSessionID;

        res.redirect("/");
      }
    })
    .catch(err => console.error('query error:', err.stack));
  });

  return router;
};
