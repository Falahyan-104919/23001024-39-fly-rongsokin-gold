const { Pool } = require('pg');
const pgp = require('pg-promise')();
const db = pgp('postgres://rongsok:240701@localhost:5432/rongsokin');
const usersTable = require('./migrations/users_table');
const mitraTable = require('./migrations/mitras_table');
const productsTable = require('./migrations/products_table');
const transactionsTable = require('./migrations/transaction_table');
const forumCustomersTable = require('./migrations/forum_customers_table');
const forumMitrasTable = require('./migrations/forum_mitra_table');
const imageTable = require('./migrations/images_table');
const forumMitrasImageJunction = require('./migrations/forum_mitra_image_junction_table');
const forumCustomersImageJunction = require('./migrations/forum_customer_image_junction_table');
const productsImageJunction = require('./migrations/product_image_junction_table');

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DB,
  password: process.env.PASSWORD,
  port: 5432, // your database port
});

const connectDatabase = () => {
  pool.query('SELECT NOW()', (error) => {
    if (error) {
      return console.error('Error connecting to the database:', error);
    } else {
      console.log('Database connection successful',);
    }
  });

  db.task(async (t)=>{
    await t.none(usersTable);
    await t.none(mitraTable);
    await t.none(productsTable)
    await t.none(transactionsTable)
    await t.none(forumCustomersTable)
    await t.none(forumMitrasTable)
    await t.none(imageTable);
    await t.none(forumMitrasImageJunction);
    await t.none(forumCustomersImageJunction);
    await t.none(productsImageJunction);
  }).then(data => {
    console.log('Database is Ready')
  }).catch(error => {
    console.log('Error Occured Please Check Your Database Schema', error)
  });
}

module.exports = { pool, connectDatabase, db };