const { db } = require('../database/db');
const adminController = {
  getCardStats: async (req, res) => {
    try {
      const stats = await db.one(`
      SELECT 
      (SELECT COUNT(*) FROM users) AS user_count,
      (SELECT COUNT(*) FROM products) AS product_count,
      ((SELECT COUNT(*) FROM forum_customers fc) + (SELECT COUNT(*) FROM forum_mitras fm)) AS discussion_count,
      (SELECT COUNT(*) FROM transactions t ) AS transaction_count;  
      `);

      res.status(200).json(stats);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
  getSummaryTable: async (req, res) => {
    try {
      const userLastAct = await db.many(`
            SELECT email, created_at FROM users ORDER BY created_at DESC LIMIT 5
        `);
      const productLastAct = await db.many(`
            SELECT name AS title, created_at FROM products ORDER BY created_at DESC LIMIT 5
        `);
      const forumLastAct = await db.many(`
        ((SELECT title, created_at FROM forum_mitras ORDER BY created_at DESC LIMIT 5)
        UNION ALL
        (SELECT title, created_at FROM forum_customers ORDER BY created_at DESC LIMIT 5))
        `);
      const transactionLastAct = await db.many(`
        select p.name, t.transaction_date  from transactions t 
        left join products p on t.product_id = p.product_id 
        order by t.transaction_date desc limit 5
        `);
      res.status(200).json({
        userLastAct,
        productLastAct,
        forumLastAct,
        transactionLastAct,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
  deactivateUser: () => {},
  deactivateProduct: () => {},
  deactivateForum: () => {},
};

module.exports = adminController;
