-- Drop and recreate Users table (Example)
DROP TABLE IF EXISTS maps CASCADE;
CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id VARCHAR(255) REFERENCES users(session_id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL
);
