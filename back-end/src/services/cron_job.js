const cron = require('node-cron');
const { db } = require('../database/db');

const transaction_deadline_scheduler = async () => {
  return cron.schedule('1 * * * * * *', async () => {
    console.log('Cron Activity at : ', new Date().toLocaleString());
    try {
      await db.none(
        `
            UPDATE transactions SET
            transaction_status = 'cancel'
            WHERE deadline < $1 AND transaction_status = 'waiting_for_payment'
        `,
        [new Date()]
      );
      console.log('Cron Activity Successfull');
    } catch (err) {
      console.error(`Error in Cron Job: ${err}`);
    }
  });
};

module.exports = { transaction_deadline_scheduler };
