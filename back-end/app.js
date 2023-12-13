require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.DEV_PORT || 3000;
const cors = require('cors');
const { connectDatabase, clearDatabase } = require('./src/database/db');
const routes = require('./src/routes/routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/public', express.static('public'));
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDatabase();
  // clearDatabase();
});
