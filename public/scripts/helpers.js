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

const getUserWithEmail = function (data, email) {
  for (const row of data) {
    if (row.email === email) {
      return row;
    }
  }
  return null;
};

module.exports = { addUser, getUserWithEmail };
