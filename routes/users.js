/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const dataBase = {title: "narnia", lat: "0.0", lng: "0.0"};
module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.post("/", (req, res) => {
    let name = req.body.name;
    let lat = req.body.lat;
    let lng = req.body.lng;
    dataBase = { title: name, lat: lat, lng: lng };
    console.log(dataBase);
    res.redirect("/");
  });
  return router;
};
