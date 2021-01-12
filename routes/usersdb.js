const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  const addUser = function(user) {
    return db.query(`
      INSERT INTO users (email, password)
      VALUES ($1, $2)
      RETURNING *;
    `, Object.values(user))
    .then(res => res.rows[0])
    .catch(err => console.error('query error', err.stack))
  }

  router.post("/", (req, res) => {
    console.log('**Post test**');
    db.query(`SELECT * FROM users;`)
      .then(data => {
        // Create function for registration and another for login

        console.log(data.rows);
        // Registration
        if (!req.body.email || !req.body.password) {
          res.status(400).send('<h2>400 - Email or password left empty</h2>');
        }
        // else if (emailExists(req.body.email, users)) {
        //   res.status(400).send('<h2>400 - Email is taken</h2>');
        else {
          console.log('*****body', req.body);
          addUser(req.body);
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
