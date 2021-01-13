const express = require('express');
const router = express.Router();
let dataBase = { title: "narnia", lat: "0.0", lng: "0.0" };
module.exports = (db) => {

  const { addPins } = require('../public/scripts/helpers');

  router.post("/", (req, res) => {
    let location = req.body['pins-name'];
    let lat = req.body['pins-lat'];
    let lng = req.body['pins-lng'];
    dataBase = { title: location, lat: lat, lng: lng };
    console.log("*************************************");
    console.log(dataBase);
    addPins(db, dataBase);
    res.redirect("/");
  });
  return router;
};
