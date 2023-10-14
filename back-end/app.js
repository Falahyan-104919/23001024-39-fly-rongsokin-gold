require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.DEV_PORT || 3000;
const bodyParser = require('body-parser');
const session = require('express-session');
const { connectDatabase } = require('./src/database/db');
const routes = require('./src/routes/routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(
  session({
    secret: 'rongsokin-key',
    resave: false,
    saveUninitialized: true,
  })
);


app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDatabase();
});