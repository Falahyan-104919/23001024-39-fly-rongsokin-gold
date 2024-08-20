const { db } = require('../database/db');

const transactionController = {
  getCustomerTransaction: async (req, res) => {
    try {
      const userId = req.params.userId;
      const transactionData = await db.manyOrNone(
        `
                SELECT t.transaction_id, t.total_price, t.transaction_date, t.transaction_status, m.mitra_name, products.products
                FROM transactions t 
                LEFT JOIN mitras m ON t.mitra_id = m.mitra_id
                LEFT JOIN (
                  SELECT tp.transaction_id, 
                  json_agg(json_build_object('product_name', p.name, 'price', tp.price, 'quantity', tp.quantity, 'image_path', i.image_path, 'unit', p.unit)) as products
                  from transaction_product tp 
                  JOIN products p ON tp.product_id = p.product_id
                  JOIN product_image pi ON p.product_id = pi.product_id
                  JOIN images i ON pi.image_id = i.image_id
                  GROUP BY tp.transaction_id
                ) as products ON t.transaction_id = products.transaction_id
                WHERE buyer_id = $1
                ORDER BY t.transaction_status DESC
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
          SELECT t.transaction_id, t.total_price, t.transaction_date, t.transaction_status, u.fullname, products.products
          FROM transactions t 
          LEFT JOIN users u ON u.user_id = t.buyer_id
          LEFT JOIN (
          SELECT tp.transaction_id,
                  json_agg(json_build_object('product_name', p.name, 'price', tp.price, 'quantity', tp.quantity, 'image_path', i.image_path, 'unit', p.unit)) as products
          FROM transaction_product tp
          JOIN products p ON tp.product_id = p.product_id 
          JOIN product_image pi ON p.product_id = pi.product_id
          JOIN images i ON pi.image_id = i.image_id 
          GROUP BY tp.transaction_id
          ) as products ON t.transaction_id = products.transaction_id
          WHERE t.mitra_id = $1 
          ORDER BY t.transaction_status DESC;
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
  getTransactionDetails: async (req, res) => {
    try {
      const { transactionId } = req.params;
      const details = await db.oneOrNone(
        `
        SELECT t.*, u.*, m.*, pr.*, pr.file_path AS payment_pict, dr.*, dr.file_path AS delivery_pict
        FROM transactions t 
        LEFT JOIN users u ON t.buyer_id = u.user_id 
        LEFT JOIN mitras m ON t.mitra_id = m.mitra_id 
        LEFT JOIN delivery_receipt dr ON t.transaction_id = dr.transaction_id 
        LEFT JOIN payment_receipt pr ON t.transaction_id = pr.transaction_id 
        LEFT JOIN (
          SELECT tp.transaction_id,
          json_agg(json_build_object('product_name', p.name, 'price', tp.price, 'quantity', tp.quantity, 'image_path', i.image_path, 'unit', p.unit)) AS products from transaction_product tp
          JOIN products p ON tp.product_id = p.product_id 
          JOIN product_image pi ON tp.product_id = pi.product_id 
          JOIN images i ON pi.image_id = i.image_id 
          GROUP BY tp.transaction_id
        ) as products ON t.transaction_id = products.transaction_id
        WHERE t.transaction_id = $1

      `,
        transactionId
      );
      res.status(200).json({ details });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Internal Server error',
      });
    }
  },
  getTransaction: async (req, res) => {
    try {
      const transactionId = req.params.transactionId;
      const transactionData = await db.oneOrNone(
        `
        SELECT t.*, u2.fullname as seller_name, m.bank_name, m.bank_number, u.fullname, products.image_data, products.products
        FROM transactions t 
        LEFT JOIN users u ON t.buyer_id = u.user_id 
        LEFT JOIN mitras m ON t.mitra_id = m.mitra_id
        LEFT JOIN users u2 ON m.user_id = u2.user_id
        LEFT JOIN (
         SELECT tp.transaction_id,
                 json_agg(json_build_object('image_path', i.image_path, 'image_name', i.image_name)) as image_data,
                 json_agg(json_build_object('product_name', p.name, 'price', tp.price, 'quantity', tp.quantity, 'image_path', i.image_path, 'unit', p.unit)) as products
         FROM transaction_product tp 
         LEFT JOIN products p ON tp.product_id = p.product_id
         LEFT JOIN product_image pi ON p.product_id = pi.product_id
         LEFT JOIN images i ON pi.image_id = i.image_id 
         GROUP BY tp.transaction_id
        ) as products ON t.transaction_id = products.transaction_id
        WHERE t.transaction_id = $1
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
      const { mitraId, products, totalPrice } = req.body;
      const { transaction_id } = await db.one(
        `
                INSERT INTO transactions(buyer_id, mitra_id, transaction_status, total_price)
                VALUES ($1, $2, $3, $4) RETURNING transaction_id
            `,
        [userId, mitraId, 'waiting_for_payment', totalPrice]
      );

      products.map(async (item) => {
        try {
          await db.none(
            `
            UPDATE products 
            SET quantity = quantity - $2
            WHERE product_id = $1
          `,
            [item['product_id'], item.order_quantity]
          );
          await db.none(
            `
            INSERT INTO transaction_product(transaction_id, product_id, quantity, price) 
            VALUES ($1,$2,$3,$4)
          `,
            [transaction_id, item.product_id, item.order_quantity, item.price]
          );
        } catch (error) {
          console.error(error);
        }
      });
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
      const { status, quantity, product_id } = req.body;
      // return console.log(status, quantity, product_id);
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
        [quantity, product_id]
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
