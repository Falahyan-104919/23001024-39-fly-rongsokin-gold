const pgp = require('pg-promise')();
const db = pgp('postgres://rongsok:240701@localhost:5432/rongsokin');

// Define the schema creation queries
const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(60) NOT NULL,
    role VARCHAR(10) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  );
`;

const createProductsTable = `
  CREATE TABLE IF NOT EXISTS products (
    product_id SERIAL PRIMARY KEY,
    mitra_id INT REFERENCES users(user_id),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  );
`;

const createForumsTable = `
  CREATE TABLE IF NOT EXISTS forums (
    forum_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    title VARCHAR(100) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT NOW()
  );
`;

// Create the tables
db.task(async (t) => {
  await t.none(createUsersTable);
  await t.none(createProductsTable);
  await t.none(createForumsTable);
})
  .then(data => {
    console.log('Tables created successfully.');
  })
  .catch(error => {
    console.error('Error creating tables:', error);
  })
  .finally(() => {
    pgp.end();
  });