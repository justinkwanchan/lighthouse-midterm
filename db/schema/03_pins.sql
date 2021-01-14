-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS pins CASCADE;
CREATE TABLE pins (
  id SERIAL PRIMARY KEY NOT NULL,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,

  list_name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(255),
  latitude NUMERIC NOT NULL,
  longitude NUMERIC NOT NULL
);
