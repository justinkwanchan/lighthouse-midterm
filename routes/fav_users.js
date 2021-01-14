const express = require('express');
const router = express.Router();
let dataBase = { userId: "34r5dw3", list: "myList", title: "narnia", lat: "0.0", lng: "0.0" };
module.exports = (db) => {

  const { addPins } = require('../public/scripts/helpers');

  router.post("/", (req, res) => {
    let pinCount = 1;
    const inputArray = [];

    while (req.body[`pins-name${pinCount}`]) {
      inputArray.push({
        name: req.body[`pins-name${pinCount}`],
        desc: req.body[`pins-desc${pinCount}`],
        icon: req.body[`pins-icon${pinCount}`],
        lat: req.body[`pins-lat${pinCount}`],
        lng: req.body[`pins-lng${pinCount}`]
      });
      pinCount++;
    }

    const dataObj = {
      userId: req.session.user_id,
      list: req.body[`pins-list`],
      inputArray
    }

    console.log("*************************************");
    addPins(db, dataObj);
    res.redirect("/");
  });
  return router;
};
