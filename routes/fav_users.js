const express = require('express');
const router = express.Router();
let dataBase = { title: "narnia", lat: "0.0", lng: "0.0" };
module.exports = (db) => {
  router.post("/", (req, res) => {
    let name = req.body.name;
    let lat = req.body.lat;
    let lng = req.body.lng;
    dataBase = { title: name, lat: lat, lng: lng };
    console.log("*************************************");
    console.log(req.body);
    res.send("/");
  });
  return router;
};
