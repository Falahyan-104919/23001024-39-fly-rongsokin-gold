const { Pool } = require('pg');
const pgp = require('pg-promise')();
const db = pgp('postgres://rongsok:240701@localhost:5432/rongsokin');
const usersTable = require('./migrations/users_table');
const productsTable = require('./migrations/products_table');
const transactionsTable = require('./migrations/transaction_table');
const forumTable = require('./migrations/forum_table');
const imageTable = require('./migrations/images_table');


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
    await t.none(usersTable.replaceAll('\n',''));
    await t.none(productsTable.replaceAll('\n',''))
    await t.none(transactionsTable.replaceAll('\n',''))
    await t.none(forumTable.replaceAll('\n',''))
    await t.none(imageTable.replaceAll('\n',''));
  }).then(data => {
    console.log('Database is Ready')
  }).catch(error => {
    console.log('Error Occured Please Check Your Database Schema', error)
  });
}

module.exports = { pool, connectDatabase, db };