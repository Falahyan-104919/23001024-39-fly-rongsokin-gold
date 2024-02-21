const { db } = require('../database/db');

const postDeliveryReceipt = async (req, res) => {
  try {
    const { transaction_id, uploaded_by, delivery_services, tracking_number } =
      req.body;
    const delivery_receipts = req.file;
    await db.none(
      `
            INSERT INTO delivery_receipt(transaction_id, uploaded_by, delivery_services, tracking_number, file_path) 
            VALUES($1,$2,$3,$4,$5)
        `,
      [
        transaction_id,
        uploaded_by,
        delivery_services,
        tracking_number,
        delivery_receipts.path,
      ]
    );
    await db.none(
      `
        UPDATE transactions SET transaction_status = 'on_the_way' WHERE transaction_id = $1
      `,
      [transaction_id]
    );

    res.status(200).json({
      message: 'Successfully Upload Delivery Receipts',
    });
  } catch (err) {
    console.error('Error While Upload Delivery Receipts : ', err);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

const getDeliveryReceipt = async (req, res) => {
  try {
    const { transaction_id } = req.params;
    const result = await db.one(
      `SELECT  * FROM delivery_receipt WHERE transaction_id=$1`,
      [transaction_id]
    );
    res.status(200).json(result);
  } catch (err) {
    console.error('Error while getting Delivery Receipt : ', err);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

module.exports = { postDeliveryReceipt, getDeliveryReceipt };
