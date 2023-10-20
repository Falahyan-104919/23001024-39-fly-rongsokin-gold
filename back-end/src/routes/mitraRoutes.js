require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { db } = require('../database/db');
const uuid = require('uuid');



const deleteAllProductImg = async(req,res,next) => {
    const productId = req.params.productId;
    const productData = await db.oneOrNone(`
    SELECT p.product_id, p.mitra_id, p.name, 
           json_agg(json_build_object('image_id', pi.image_id, 'image_path', i.image_path, 'image_name', i.image_name)) as images
    FROM products p
    LEFT JOIN product_image pi ON p.product_id = pi.product_id
    LEFT JOIN images i ON pi.image_id = i.image_id
    WHERE p.product_id = $1
    GROUP BY p.product_id;
  `, productId)
    const mitraId = productData['mitra_id']
    const productImage = productData['images'].map((data) => {
        return data.image_name
    })

    for(let i = 0; i < productImage.length; i++){
        fs.unlink(path.join('public','img','products', `${mitraId}`,`${productImage[i]}`), (err) => {
            if(err){
                return res.status(400).json({
                    message: "Failed to Update the Image"
                });
            }
        });
        await db.none(`
            DELETE FROM images WHERE image_name = $1
        `, productImage[i])
    }

    await db.none(`
        DELETE FROM product_image WHERE product_id = $1
    `, productId)
    req.folderName = mitraId
    next()
}

const imgProductStorage = multer.diskStorage({
    destination : (req, res, cb)=>{
        const mitraId = req.params.mitraId || req.folderName;
        const uploadDir = path.join('public', 'img', 'products', `${mitraId}`);

        fs.access(uploadDir, (error)=>{
            if(error){
                if(error.code === 'ENOENT'){
                    fs.mkdirSync(uploadDir, {recursive: true})
                }
                cb(null, uploadDir);
            }else{
                cb(null, uploadDir)
            }
        });
    },
    filename: (req, res, cb) => {
        const uniqeFileName = `${Date.now()}`;
        cb(null, uniqeFileName)
    }
})

const imgProductHandler = multer({storage: imgProductStorage})
const uploadsProductImg = imgProductHandler.array('productImg',5)

const verifyToken = (req,res,next) => {
    const token = req.headers.authorization

    if(!token){
        return res.status(403).json({
            message: "Token not Provided"
        })
    }

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decode;
        next();
    }catch(error){
        console.error("Error during token verification", error)
        return res.status(401).json({
            message: "Invalid Token"
        })
    }

}

const forumMitraController = require('../controllers/forumMitraController');


// Mitra Forum Routes
router.get('/mitra/forum', verifyToken, forumMitraController.getForumMitra);
router.post('/mitra/forum/:userId', verifyToken, forumMitraController.postForumMitra);
router.put('/mitra/forum/:userId', verifyToken, forumMitraController.updateForumMitra);

const productMitraController = require('../controllers/productController');

// Mitra Product Routes
router.get('/mitra/products', productMitraController.getAllProduct);
router.post('/mitra/products/upload/:mitraId', uploadsProductImg, productMitraController.postProduct);
router.get('/mitra/products/:productId', verifyToken, productMitraController.getProduct);
router.put('/mitra/products/update/:productId', deleteAllProductImg, uploadsProductImg, productMitraController.updateProduct);



module.exports = router;