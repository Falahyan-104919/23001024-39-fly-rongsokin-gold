require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.DEV_PORT;
const cors = require('cors');
const { connectDatabase, clearDatabase } = require('./src/database/db');
const routes = require('./src/routes/routes');
const { transaction_deadline_scheduler } = require('./src/services/cron_job');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/public', express.static('public'));
app.use('/', routes);

transaction_deadline_scheduler();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDatabase();
  // clearDatabase();
});
