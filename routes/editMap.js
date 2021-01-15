const { response } = require('express');
const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
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
}
