const express = require('express');
const router = express.Router();
let dataBase = { userId: "34r5dw3", list: "myList", title: "narnia", desc: "fantasy", icon: "sports", lat: "0.0", lng: "0.0" };
module.exports = (db) => {

  const { addPins } = require('../public/scripts/helpers');

  // Render page for the saved map
  router.get("/:map", (req, res) => {
    db.query(`
    SELECT * FROM pins
    WHERE list_name = ${req.params.map};
    `).then(data => {
      // if (!urlExists(req.params.map, urlDatabase)) {
      //   res.status(418).send('<h2>418 - I\'m a teapot. The URL does not exist.</h2>');
      // } else if (!req.session.user_id) {
      //   res.status(403).send('<h2>403 - Access is forbidden</h2>');
      // } else if (!userOwnsURL(req.session.user_id, req.params.map, urlDatabase)) {
      //   res.status(403).send('<h2>403 - Forbidden - You do not own this short URL</h2>');
      // } else {
        const url = urlDatabase[req.params.map];
        const templateVars = {
          list_name: req.params.map,
          pins: data.rows
        };
        res.render("urls_show", templateVars);
      // }
    })
    .catch(err => console.error('query error:', err.stack));
  });

  router.post("/", (req, res) => {
    const userId = req.session.user_id;
    const list = req.body['pins-list'];
    const location = req.body['pins-name'];
    const desc = req.body['pins-desc'];
    const icon = req.body['pins-icon'];
    const lat = req.body['pins-lat'];
    const lng = req.body['pins-lng'];
    dataBase = {
      userId,
      list,
      title: location,
      desc,
      icon,
      lat,
      lng
    };
    console.log("*************************************");
    console.log(dataBase);
    addPins(db, dataBase);
    res.redirect("/");
  });
  return router;
};
