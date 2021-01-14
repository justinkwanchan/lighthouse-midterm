// Generate a random 6-character-long alphanumeric string
const generateRandomString = function () {
  const charStr = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let alphaNum = '';
  for (let i = 0; i < 6; i++) {
    alphaNum += charStr.charAt(Math.floor(Math.random() * charStr.length));
  }
  return alphaNum;
};

// Add user to database
const addUser = function(db, user) {
  return db.query(`
    INSERT INTO users (session_id, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `, Object.values(user))
    .then(res => res.rows[0])
    .catch(err => console.error('query error', err.stack))
};

// Return user information from email
const getUserWithEmail = function(data, email) {
  for (const row of data) {
    if (row.email === email) {
      return row;
    }
  }
  return null;
};

// Add pin's data
const addPins = function(db, data) {
  console.log("HERE IS THE DATA.....");
  console.log(data);

  db.query(`
    INSERT INTO maps (user_id, name) VALUES (${data.userID}, ${data.list})
    RETURNING *;
  `)
    .then(res => {
      console.log(res.rows[0]);
      // let dbQuery = `
      //   INSERT INTO pins (map_id, name, description, icon, latitude, longitude)
      //   VALUES
      // `;

      // for (let i = 0; i < data.inputArray.length; i++) {
      //   dbQuery += `($${1 + 5 * i}, $${2 + 5 * i}, $${3 + 5 * i}, $${4 + 5 * i}, $${5 + 5 * i}),`
      // }
      // dbQuery += ';';
      // console.log(dbQuery);

      // let args = [];
      // for (const row of data.inputArray) {
      //   args.push(res.rows[0].id, row.name, row.desc, row.icon, row.lat, row.lng);
      // }

      // db.query(dbQuery, args);
    })
    .catch(err => console.error('query error', err.stack));
  // let loopPinsData = function() {
  //   for (let i = 0; i < data.title.length; i++) {
  //     db.query(dbQuery, [data.userId, data.list, data.title[i], data.lat[i], data.lng[i]]);

  //   }
  // }
  // return loopPinsData();
}

module.exports = { generateRandomString, addUser, getUserWithEmail, addPins };
