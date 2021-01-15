const { response } = require('express');
const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  const { generateRandomString, addUser, getUserWithEmail } = require('../public/scripts/helpers');

  router.get("/listOfMaps", (req, res) => {
    let templateVars = {
      id: [],
      user_id: [],
      list_name: [],
      name: [],
      latitude: [],
      longitude: [],
    };
      db.query(`
      SELECT * FROM users
      JOIN maps ON session_id = maps.user_id
      JOIN pins ON maps.id = map_id
      WHERE user_id = $1;
      `, [req.session.user_id]).then(data => {
          console.log(data.rows);
          const user = data.rows.filter(row => row.session_id === req.session.user_id);
          templateVars.user_info = user[0];

          for (const value of data.rows) {
            console.log(value);
            templateVars.id.push(value.id);
            templateVars.user_id.push(value.user_id);
            templateVars.list_name.push(value.list_name);
            templateVars.name.push(value.name);
            templateVars.latitude.push(value.latitude);
            templateVars.longitude.push(value.longitude);
          }
          //console.log(response.rows.length);
          res.render("user_data", templateVars);

        }).catch(err => console.error('query error:', err.stack));
  });

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

        res.redirect("/userView");
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
        //console.log("000000000000000000000000000000");
        res.redirect("/listOfMaps");
      }
    })
      .catch(err => console.error('query error:', err.stack));
  });

  // Log out
  router.post("/logout", (req, res) => {
    req.session.user_id = null;
    res.redirect("/");
  });

  router.get("/userView", (req, res) => {
    db.query(`SELECT * FROM users;`).then(data => {
      // console.log(data.rows);
      const user = data.rows.filter(row => row.session_id === req.session.user_id);
      const templateVars = {
        user_info: user[0]
      };
      res.render("user_show", templateVars);
    }).catch(err => console.error('query error:', err.stack));

  });

  return router;
};
