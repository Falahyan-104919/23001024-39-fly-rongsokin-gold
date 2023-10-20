const { db } = require('../database/db');


const forumCustomerController = {
    getAllForumCustomer: async(req,res)=>{
        try{
            const forumCustomerData = await db.manyOrNone(`
                SELECT fc.forum_customers_id, fc.user_id, fc.title, fc.content, fc.updated_at, 
                        json_agg(json_build_object('image_id', fci.image_id, 'image_path', i.image_path, 'image_name', i.image_name))
                FROM forum_customers fc 
                LEFT JOIN forum_customer_id fci ON fc.forum_customers_id = fci.forum_id 
                LEFT JOIN images i ON fci.image_id = i.image_id 
                GROUP BY fc.forum_customer_id; 
            `)
    
            res.status(200).json({ 
                message: "Fetching All Forum Customers Data Successfully",
                data: forumCustomerData });
        }catch(error){
            console.error(error);
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    },
    getForumCustomer: async (req,res) => {
        try{
            const forumCustomerId = req.params.forumCustomerId;

            const forumCustomerData = await db.manyOrNone(`
                SELECT fc.forum_customers_id, fc.user_id, fc.title, fc.content, fc.updated_at, 
                        json_agg(json_build_object('image_id', fci.image_id, 'image_path', i.image_path, 'image_name', i.image_name))
                FROM forum_customers fc 
                LEFT JOIN forum_customer_id fci ON fc.forum_customers_id = fci.forum_id 
                LEFT JOIN images i ON fci.image_id = i.image_id 
                WHERE fc.forum_customers_id = $1
                GROUP BY fc.forum_customer_id; 
            `, forumCustomerId);

            res.status(200).json({
                message: "Fetching Forum Customers Data Successfully",
                data: forumCustomerData
            })

        }catch(error){
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    },
    postForumCustomer : async (req,res) => {
        try{
            const userId = req.params.userId;
            const { title, content } = req.body;
            const forumImage = req.files;
    
            const newForumCustomer = await db.one(`
                    INSERT INTO forum_customers (user_id, title, content)
                    VALUES ($1, $2, $3) RETURNING forum_customers_id
            `, [userId, title, content]);
    
            for(let i = 0; i < forumImage.length; i++){
                    const image = forumImage[i];
                    const newImage = await db.one(`
                        INSERT INTO images(user_id, image_path, image_name)
                        VALUES($1,$2,$3) RETURNING image_id
                    `,[userId, image.path, image.name]);
    
                    await db.none(`
                        INSERT INTO forum_customer_image(forum_id, image_id)
                        VALUES($1,$2)
                    `, [newForumCustomer.forum_customers_id, newImage.image_id])
            }
    
            res.status(201).json({
                message: "Creating Forum with Image Successfully"
            });

        }catch(error){
            res.status(500).json({
                message: "Internal Server Error"
            })
        }

    },
    updateForumCustomer: async (req,res) => {
        
    },
    deleteForumCustomer: async (req,res) => {
        
    }
}

module.exports = forumCustomerController