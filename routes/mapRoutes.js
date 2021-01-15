const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  const { generateRandomString, addUser, getUserWithEmail } = require('../public/scripts/helpers');

  // Redirect to saved map page upon clicking Edit button from maps list page
  router.get("/:map", (req, res) => {
    res.redirect(`/maps/${req.params.map}`);
  });



  return router;
};
