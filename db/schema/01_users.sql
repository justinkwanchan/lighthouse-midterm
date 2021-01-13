-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  session_id VARCHAR(255) PRIMARY KEY NOT NULL,
<<<<<<< HEAD
=======
  name VARCHAR(255) DEFAULT 'Test Name',
>>>>>>> 5b584a71c358b6c50b30bf16ddec0966b94fbe0d
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
