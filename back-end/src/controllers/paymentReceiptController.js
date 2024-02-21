const { db } = require('../database/db');

const postPaymentReceipt = async (req, res) => {
  try {
    const { transaction_id, uploaded_by, payment_amount, payment_method } =
      req.body;
    const paymentReceipt = req.file;
    await db.none(
      `
            INSERT INTO payment_receipt(transaction_id, uploaded_by, payment_amount, payment_method, file_path) 
            VALUES( $1, $2, $3, 'bank_transfer', $4 )
        `,
      [transaction_id, uploaded_by, payment_amount, paymentReceipt.path]
    );
    await db.none(
      `
      UPDATE transactions SET transaction_status = 'waiting_for_delivery' WHERE transaction_id=$1`,
      [transaction_id]
    );
    res.status(200).json({
      message: 'Successfully Uploaded Payment Receipt',
    });
  } catch (err) {
    console.error(`Error in posting payment receipt: ${err}`);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

const getPaymentReceipt = async (req, res) => {
  try {
    const { transaction_id } = req.params;
    const result = await db.one(
      `
      SELECT pr.*, u.* FROM payment_receipt pr 
      LEFT JOIN users u ON pr.uploaded_by = u.user_id
      WHERE transaction_id=$1
    `,
      [transaction_id]
    );
    res.status(200).json(result);
  } catch (err) {
    console.error(`Something Wrong : ${err}`);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

module.exports = { postPaymentReceipt, getPaymentReceipt };
