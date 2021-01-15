const express = require('express');
const router = express.Router();
let dataBase = { userId: "34r5dw3", list: "myList", title: "narnia", desc: "fantasy", icon: "sports", lat: "0.0", lng: "0.0" };
module.exports = (db) => {

  const { addPins } = require('../public/scripts/helpers');

  // Render list of saved maps for user
  router.get("/home", (req, res) => {
    db.query(`
    SELECT * FROM users
    JOIN maps ON session_id = user_id
    WHERE user_id = $1;
    `, [req.session.user_id])
    .then(data => {
      if (!req.session.user_id) {
        res.status(403).send('<h2>403 - Access is forbidden</h2>');
      } else {
        console.log('TESTESTSETESTEST222222');
        console.log(data.rows);
        const templateVars = {
          maps: data.rows,
          user_info: data.rows
        };
        res.render("maps", templateVars);
      }
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
