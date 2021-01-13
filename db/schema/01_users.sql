-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  session_id VARCHAR(255) NOT NULL,
  name VARCHAR(255) DEFAULT 'Test Name',
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
