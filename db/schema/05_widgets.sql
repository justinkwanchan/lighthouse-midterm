-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS widgets CASCADE;
CREATE TABLE widgets (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id VARCHAR(255) REFERENCES users(session_id),
  name VARCHAR(255) NOT NULL
);
