const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  const { addUser, getUserWithEmail } = require('../public/scripts/helpers');

  router.post("/", (req, res) => {
    db.query(`SELECT * FROM users;`).then(data => {
      // Create function for registration and another for login

      // Registration
      if (!req.body.email || !req.body.password) {
        res.status(400).send('<h2>400 - Email or password left empty</h2>');
      } else if (getUserWithEmail(data.rows, req.body.email) !== null) {
        res.status(400).send('<h2>400 - Email is taken</h2>');
      } else {
        addUser(db, req.body);
        res.redirect("/");
      }

      // const users = data.rows;
      // console.log(users);
      // res.json({ users });
    })
    .catch(err => console.error('query error:', err.stack));
  });

  return router;
};
