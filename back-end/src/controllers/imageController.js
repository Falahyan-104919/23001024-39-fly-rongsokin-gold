const { db } = require('../database/db')
const fs = require('fs');
const path = require('path');



const imageController = {
    getProfileImage : async(req, res) => {
        try{
            const userId = req.params.userId;
            const imgData = await db.oneOrNone(`
                SELECT u.image_id, i.image_name, i.image_path FROM users u LEFT JOIN images i ON i.user_id = u.user_id
            `);
            const image = fs.readFileSync(path('public','img','profile_image',`${userId}`,`${fileName}`))
        }catch(err){
            console.error(error);
            res.status(400).json(null)
        }
    },
    getProductImages: async() => {
        try {
            
        } catch (error) {
            console.error(err)
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    },
    getForumMitraImages: async(req,res)=>{
        try{

        }catch(error){
            console.error(error);
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    },
    getForumCustomerImages: async(req,res)=>{
        try{

        }catch(error){
            console.error(error);
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    },
}

module.exports = imageController;