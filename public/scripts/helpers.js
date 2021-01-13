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
  let loopPinsData = function() {
    for (let i = 0; i < data.title.length; i++) {
      db.query(`
      INSERT INTO pins (user_id, list_name, name, latitude, longitude)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `, [data.userId, data.list, data.title[i], data.lat[i], data.lng[i]])
      .then(res => res.rows[0])
      .catch(err => console.error('query error', err.stack))
    }
  }
  return loopPinsData();
}

module.exports = { generateRandomString, addUser, getUserWithEmail, addPins };
