const { db } = require('../database/db');

const transactionController = {
    getAllCustomerTransaction: async(req,res) => {
        try{
            const userId = req.params.userId;
            const transactionData = await db.manyOrNone(`
                SELECT t.transaction_id, p.name, t.quantity, t.total_price, t.transaction_date, t.transaction_status, json_agg(json_build_object('image_path', i.image_path, 'image_name', i.image_name)) as image_data
                FROM transactions t 
                LEFT JOIN products p ON t.product_id = p.product_id 
                LEFT JOIN product_image pi ON p.product_id = pi.product_id
                LEFT JOIN images i ON pi.image_id = i.image_id 
                WHERE buyer_id = $1 
                GROUP BY t.transaction_id, p.name
            `, userId);

            res.status(200).json({
                message: 'Fetch All Transaction Successfully',
                data : transactionData
            })

        }catch(error){
            console.error(error);
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    },
    getAllMitraOrderTransaction: async(req,res) => {
        try{
            const mitraId = req.params.mitraId;
            const transactionData = await db.manyOrNone(`
                SELECT t.transaction_id, p.name, t.quantity, t.total_price, t.transaction_date, t.transaction_status, json_agg(json_build_object('image_path', i.image_path, 'image_name', i.image_name)) as image_data
                FROM transactions t 
                LEFT JOIN products p ON t.product_id = p.product_id 
                LEFT JOIN product_image pi ON p.product_id = pi.product_id
                LEFT JOIN images i ON pi.image_id = i.image_id 
                WHERE t.mitra_id = $1 
                GROUP BY t.transaction_id, p.name
            `, mitraId);

            res.status(200).json({
                message: 'Fetch All Transaction Successfully',
                data : transactionData
            })

            
        }catch(error){
            console.error(error);
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    },
    getTransaction: async(req,res) => {
        try{
            const transactionId = req.params.transactionId;
            const transactionData = await db.oneOrNone(`
            SELECT t.transaction_id, p.name, t.quantity, t.total_price, t.transaction_date, t.transaction_status, json_agg(json_build_object('image_path', i.image_path, 'image_name', i.image_name)) as image_data
            FROM transactions t 
            LEFT JOIN products p ON t.product_id = p.product_id 
            LEFT JOIN product_image pi ON p.product_id = pi.product_id
            LEFT JOIN images i ON pi.image_id = i.image_id 
            WHERE t.transaction_id = $1
            GROUP BY t.transaction_id, p.name
            `, transactionId);

            res.status(200).json({
                message: "Fetch Transaction Successfully",
                data: transactionData
            })

        }catch(error){
            console.error(error);
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    },
    postTransaction: async(req,res) => {
        try{
            const userId = req.params.userId;
            const {
                mitraId,
                productId,
                quantity,
                totalPrice
            } = req.body;

            await db.none(`
                INSERT INTO transactions(buyer_id, mitra_id, product_id, transaction_status, quantity, total_price)
                VALUES ($1, $2, $3, $4, $5, $6)
            `, [userId, mitraId, productId, 'pending', quantity, totalPrice]);

            res.status(201).json({
                message: "Transaction Created Successfully"
            })

        }catch(error){
            console.error(error);
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    },
    updateStatusTransaction: async(req,res) => {
        try{
            const transactionId = req.params.transactionId
            const { status } = req.body;

            await db.none(`
                UPDATE transactions SET transaction_status = $1 WHERE transaction_id = $2
            `,[status, transactionId])

            res.status(201).json({
                message: "Updating Transaction Status Successfull"
            })

        }catch(error){
            console.error(error);
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    },
    deleteTransaction: async(req,res)=>{
        try{
            const transactionId = req.params.transactionId;

        }catch(error){
            console.error(error);
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
}

module.exports = transactionController;