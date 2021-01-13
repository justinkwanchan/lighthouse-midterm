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
const addUser = function (db, user) {
  return db.query(`
    INSERT INTO users (email, password)
    VALUES ($1, $2)
    RETURNING *;
  `, Object.values(user))
    .then(res => res.rows[0])
    .catch(err => console.error('query error', err.stack))
};

//
const getUserWithEmail = function (db, email) {
  return db.query(`SELECT * FROM users;`)
    .then(data => {
      for (const row of data.rows) {
        console.log(row.email);
        console.log(email);
        console.log(row.email === email);
        if (row.email === email) {
          return row;
        }
      }
      console.log(null);
      return null;
    })
    .catch(err => console.error('query error:', err.stack));
};

module.exports = { generateRandomString, addUser, getUserWithEmail };
