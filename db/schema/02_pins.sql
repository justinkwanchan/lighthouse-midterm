-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS pins CASCADE;
CREATE TABLE pins (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id VARCHAR(255) REFERENCES users(session_id) ON DELETE CASCADE,

  list_name VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  latitude NUMERIC NOT NULL,
  longitude NUMERIC NOT NULL
);
