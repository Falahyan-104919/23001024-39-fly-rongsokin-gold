const { db } = require('../database/db');


const forumController = {
    getForumCustomer: async (req,res) => {
        try{
            const allForumData = await db.manyOrNone(`
                SELECT * FROM forums
                WHERE type = 'customer';
            `);
            res.status(400).json(allForumData)
        }catch(error){
            console.error(error);
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    },
    postForumCustomer : async (req,res) => {
        try{
            const userId = req.params.userId;
            const { title, content } = req.body;

            await db.none(`
                INSERT INTO forums (user_id, type, title, content)
                VALUES ($1, 'customer', $2, $3)
            `, [userId, title, content])

            res.status(400).json({
                message: "Posted to Customer Forums"
            })
        }catch(error){
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    },
    updateForumCustomer: async (req,res) => {
        try{
            const userId = req.params.userId;
            const {forumId, title, content} = req.body;

            await db.none(`
                UPDATE forums SET 
                title = $1,
                content = $2
                WHERE forum_id = $3 AND user_id = $4
            `, [title, content, forumId, userId])
            res.status(400).json({
                message: "Forum succesfully Edited"
            })
        }catch(error){
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    },
    getForumMitra : async (req,res) => {
        try{
            const allForumMitraData = await db.manyOrNone(`
                SELECT * FROM forums
                WHERE type = 'mitra';
            `)
            res.status(400).json(allForumMitraData)
        }catch(error){
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    },
    postForumMitra: async (req,res) => {
        try{
            const userId = req.params.userId;
            const { title, content} = req.body;

            await db.none(`
                INSERT INTO forums (user_id, type, title, content)
                VALUES ($1, 'mitra', $2, $3)
            `, [userId, title, content]);

            res.status(400).json({
                message: "Posted to Mitra Forums Successfull"
            })
        }catch(error){
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    },
    updateForumMitra: async (req,res) => {
        try{
            const userId = req.params.userId;
            const { forumId, title, content } = req.body;

            await db.none(`
                UPDATE forums SET
                title = $1,
                content = $2
                WHERE forum_id = $3 AND user_id = $4
            `,[title, content, forumId, userId])
            res.status(400).json({
                message: "Forum Successfully Edited"
            })
        }catch(error){
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
}

module.exports = forumController