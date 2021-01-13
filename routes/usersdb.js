const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  const { generateRandomString, addUser, getUserWithEmail } = require('../public/scripts/helpers');

  // Register a new email
  router.post("/register", (req, res) => {
    db.query(`SELECT * FROM users;`).then(data => {
      if (!req.body.email || !req.body.password) {
        res.status(400).send('<h2>400 - Email or password left empty</h2>');
      } else if (getUserWithEmail(data.rows, req.body.email) !== null) {
        res.status(400).send('<h2>403 - Email is taken</h2>');
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

  // Login
  router.post("/login", (req, res) => {
    db.query(`SELECT * FROM users;`).then(data => {
      const user = getUserWithEmail(data.rows, req.body.email);

      if (!req.body.email || !req.body.password) {
        res.status(400).send('<h2>400 - Email or password left empty</h2>');
      } else if (user === null) {
        res.status(403).send('<h2>403 - Email does not exist</h2>');
      } else if (req.body.password !== user.password) {
        res.status(403).send('<h2>403 - Password does not match</h2>');
      } else {
        req.session.user_id = user.session_id;

        res.redirect("/");
      }
    })
    .catch(err => console.error('query error:', err.stack));
  });

  // Log out
  router.post("/logout", (req, res) => {
    req.session.user_id = null;
    res.redirect("/");
  });

  return router;
};
