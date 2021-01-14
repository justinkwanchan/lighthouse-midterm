const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  const { generateRandomString, addUser, getUserWithEmail } = require('../public/scripts/helpers');

  // Redirect to saved map page upon clicking Edit button from maps list page
  router.get("/:map/edit", (req, res) => {
    res.redirect(`/maps/${req.params.map}`);
  });

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

  return router;
};
