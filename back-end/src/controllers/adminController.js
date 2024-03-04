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
      const userLastAct = await db.manyOrNone(`
            SELECT email, created_at FROM users ORDER BY created_at DESC LIMIT 5
        `);
      const productLastAct = await db.manyOrNone(`
            SELECT name AS title, created_at FROM products ORDER BY created_at DESC LIMIT 5
        `);
      const forumLastAct = await db.manyOrNone(`
          WITH combined AS (
            SELECT title, created_at FROM forum_mitras
            UNION ALL
            SELECT title, created_at FROM forum_customers
          ),
          ranked AS (
            SELECT *, RANK() OVER (ORDER BY created_at DESC) rank
            FROM combined
          )
          SELECT title, created_at
          FROM ranked
          WHERE rank <= 5
        `);
      const transactionLastAct = await db.manyOrNone(`
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
  getProducts: async (req, res) => {
    try {
      const products = await db.manyOrNone(`
        select p.product_id, p.name, m.mitra_name, p.updated_at from products p 
        left join mitras m on p.mitra_id = m.mitra_id 
        where status 
        order by p.updated_at desc;
        `);
      res.status(200).json({ products });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
  getTransaction: async (req, res) => {
    try {
      const transaction = await db.manyOrNone(`
      select t.*, u.fullname, m.mitra_name, p."name" as product_name from transactions t 
      left join users u on t.buyer_id = u.user_id 
      left join mitras m on t.mitra_id = m.mitra_id 
      left join products p on t.product_id = p.product_id 
      `);
      res.status(200).json(transaction);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: `Failed to fetch data : ${err}`,
      });
    }
  },
  getForumCustomer: async (req, res) => {
    try {
      const forumList = await db.manyOrNone(`
        select fc.forum_customers_id, fc.title, u.fullname, fc.updated_at, fc.status  from forum_customers fc 
        left join users u on fc.user_id = u.user_id
        where fc.status
        order by fc.updated_at desc 
      `);
      res.status(200).json({
        list: forumList,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
  getForumMitra: async (req, res) => {
    try {
      const forumList = await db.manyOrNone(`
      select fm.forum_mitra_id, fm.title, u.fullname, fm.updated_at from forum_mitras fm 
        left join mitras m on fm.mitra_id = m.mitra_id 
        left join users u on m.user_id = u.user_id 
        where fm.status 
        order by fm.updated_at DESC
      `);
      res.status(200).json({ forumList });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
  turnToSuperuser: async (req, res) => {
    try {
      const { userId } = req.params;
      await db.none("UPDATE users SET role='admin' WHERE user_id=$1", [userId]);
      res.status(200).json({
        message: 'Users Successfully Turn to Superuser',
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
  deactivateUser: async (req, res) => {
    try {
      const { userId } = req.params;
      await db.none(
        `
        UPDATE users SET status = false WHERE user_id = $1
      `,
        [userId]
      );
      res.status(200).json({
        message: 'Users Deactivated',
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
  deactivateProduct: async (req, res) => {
    try {
      const { productId } = req.params;
      await db.none(
        `
        UPDATE products SET status = false WHERE product_id = $1
      `,
        [productId]
      );
      res.status(200).json({
        message: 'Deleteing Product Successfully',
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
  deactivateForumCustomer: async (req, res) => {
    try {
      const { forumId } = req.params;
      await db.none(
        `
        UPDATE forum_customers SET status = false WHERE forum_customers_id = $1
      `,
        [forumId]
      );
      res.status(200).json({
        message: 'Deleting Forum Successfully',
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
  deactivateForumMitra: async (req, res) => {
    try {
      const { forumId } = req.params;
      await db.none(
        `
        UPDATE forum_mitras SET status = false WHERE forum_mitra_id = $1
      `,
        [forumId]
      );
      res.status(200).json({
        message: 'Deleting Forum Mitra Successfull',
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
  getProductTypeWithMitraType: async (req, res) => {
    try {
      const productMitraType = await db.manyOrNone(`
        SELECT pt.product_type_id, mt.type, pt.name  FROM product_type pt
          LEFT JOIN mitra_type mt ON pt.mitra_type_id = mt.mitra_type_id
          WHERE pt.status 
          GROUP BY pt.product_type_id, mt.mitra_type_id, mt.type
          order by mt.type
      `);
      res.status(200).json({ productMitraType });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
  putProductType: async (req, res) => {
    try {
      const { productTypeId } = req.params;
      await db.none(
        `
      UPDATE product_type SET status = false WHERE product_type_id = $1
    `,
        [productTypeId]
      );
      res.status(200).send();
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  },
};

module.exports = adminController;
