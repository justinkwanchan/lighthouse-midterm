const express = require('express');
const router = express.Router();
let dataBase = { userId: "34r5dw3", list: "myList", title: "narnia", desc: "fantasy", icon: "sports", lat: "0.0", lng: "0.0" };
module.exports = (db) => {

  const { addPins } = require('../public/scripts/helpers');

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
