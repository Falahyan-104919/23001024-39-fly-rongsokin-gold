const { db } = require('../database/db');

const transactionController = {
  getCustomerTransaction: async (req, res) => {
    try {
      const userId = req.params.userId;
      const transactionData = await db.manyOrNone(
        `
                SELECT t.transaction_id, p.name, t.quantity, t.total_price, t.transaction_date, t.transaction_status, m.mitra_name,
                json_agg(json_build_object('image_path', i.image_path, 'image_name', i.image_name)) as image_data
                FROM transactions t 
                RIGHT JOIN mitras m ON t.mitra_id = m.mitra_id
                LEFT JOIN products p ON t.product_id = p.product_id 
                RIGHT JOIN product_image pi ON p.product_id = pi.product_id
                RIGHT JOIN images i ON pi.image_id = i.image_id 
                WHERE buyer_id = $1 
                GROUP BY t.transaction_id, p.name, m.mitra_name
            `,
        userId
      );

      res.status(200).json({
        message: 'Fetch All Transaction Successfully',
        data: transactionData,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
  getMitraOrderTransaction: async (req, res) => {
    try {
      const mitraId = req.params.mitraId;
      const transactionData = await db.manyOrNone(
        `
                SELECT t.transaction_id, p.name, t.quantity, t.total_price, t.transaction_date, t.transaction_status, u.fullname, p.quantity as quantity_product, p.product_id, json_agg(json_build_object('image_path', i.image_path, 'image_name', i.image_name)) as image_data
                FROM transactions t 
                LEFT JOIN users u ON u.user_id = t.buyer_id
                RIGHT JOIN products p ON t.product_id = p.product_id 
                RIGHT JOIN product_image pi ON p.product_id = pi.product_id
                RIGHT JOIN images i ON pi.image_id = i.image_id 
                WHERE t.mitra_id = $1 
                GROUP BY t.transaction_id, p.name, u.fullname, p.quantity, p.product_id
            `,
        [mitraId]
      );

      res.status(200).json({
        message: 'Fetch All Transaction Successfully',
        data: transactionData,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
  getTransaction: async (req, res) => {
    try {
      const transactionId = req.params.transactionId;
      const transactionData = await db.oneOrNone(
        `
            SELECT t.transaction_id, p.name, t.quantity, t.total_price, t.transaction_date, t.transaction_status, json_agg(json_build_object('image_path', i.image_path, 'image_name', i.image_name)) as image_data
            FROM transactions t 
            RIGHT JOIN products p ON t.product_id = p.product_id 
            RIGHT JOIN product_image pi ON p.product_id = pi.product_id
            RIGHT JOIN images i ON pi.image_id = i.image_id 
            WHERE t.transaction_id = $1
            GROUP BY t.transaction_id, p.name
            `,
        [transactionId]
      );

      res.status(200).json({
        message: 'Fetch Transaction Successfully',
        data: transactionData,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
  postTransaction: async (req, res) => {
    try {
      const userId = req.params.userId;
      const { mitraId, productId, quantity, totalPrice } = req.body;

      await db.none(
        `
                INSERT INTO transactions(buyer_id, mitra_id, product_id, transaction_status, quantity, total_price)
                VALUES ($1, $2, $3, $4, $5, $6)
            `,
        [userId, mitraId, productId, 'pending', quantity, totalPrice]
      );

      res.status(201).json({
        message: 'Transaction Created Successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
  updateStatusTransaction: async (req, res) => {
    try {
      const transactionId = req.params.transactionId;
      const { status } = req.body;

      await db.none(
        `
                UPDATE transactions SET transaction_status = $1 WHERE transaction_id = $2
            `,
        [status, transactionId]
      );

      res.status(201).json({
        message: 'Updating Transaction Status Successfull',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
  deleteTransaction: async (req, res) => {
    try {
      const transactionId = req.params.transactionId;
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
  processOrder: async (req, res) => {
    try {
      const { transactionId } = req.params;
      const { status, quantity, productId } = req.body;
      await db.none(
        `
        UPDATE transactions SET transaction_status = $1 WHERE transaction_id = $2
      `,
        [status, transactionId]
      );
      await db.none(
        `
        UPDATE products SET quantity = $1 WHERE product_id = $2
      `,
        [quantity, productId]
      );
      res.status(201).json({
        message: 'Processing Order is Successfull',
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
};

module.exports = transactionController;
