-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS pins CASCADE;
CREATE TABLE pins (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  latitude NUMERIC NOT NULL,
  longitude NUMERIC NOT NULL
);
