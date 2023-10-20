const fs = require('fs');
const path = require('path');
const multer = require('multer');
const {db} = require('../../database/db');

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
});

const imgForumCustomerStorage = multer.diskStorage({
    destination: (req,res,cb) => {
        const userId = req.params.userId;
        const uploadDir = path.join('public','img','forum_customer', `${userId}`);

        fs.access(uploadDir, (error) => {
            if(error){
                if(error.code == 'ENOENT'){
                    fs.mkdirSync(uploadDir, {recursive: true});
                }
                cb(null, uploadDir)
            }else{
                cb(null, uploadDir)
            }
        });
    },
    filename: (req,res,cb) => {
        const uniqeFileName = `${Date.now()}`;
        cb(null, uniqeFileName);
    }
});

const imgForumMitraStorage = multer.diskStorage({
    destination: (req,res,cb) => {
        const mitraId = req.params.mitraId;
        const uploadDir = path.join('public','img','forum_mitra', `${mitraId}`);

        fs.access(uploadDir, (error) => {
            if(error){
                if(error.code == 'ENOENT'){
                    fs.mkdirSync(uploadDir, {recursive: true});
                }
                cb(null,uploadDir);
            }else{
                cb(null, uploadDir);
            }
        });
    },
    filename: (req, res, cb)=>{
        const uniqeFileName = `${Date.now()}`;
        cb(null, uniqeFileName);
    }
});

const imgProfileStorage = multer.diskStorage({
    destination: (req,res,cb) => {
        const userId = req.params.userId;
        const uploadDir = path.join('public','img','profile_image', `${userId}`);

        fs.access(uploadDir, (error) => {
            if(error){
                if(error.code = 'ENOENT'){
                    fs.mkdirSync(uploadDir, {recursive: true});
                }
                cb(null, uploadDir);
            }else{
                cb(null, uploadDir);
            }
        })

    },
    filename: (req,res,cb)=>{
        const uniqeFileName = `${Date.now()}`;
        cb(null, uniqeFileName)
    }
})

const storage = {
    productsImageStorage: multer({storage: imgProductStorage}),
    forumCustomerImageStorage: multer({storage: imgForumCustomerStorage}),
    forumMitraImageStorage: multer({storage: imgForumMitraStorage}),
    profileImageStorage: multer({storage: imgProfileStorage})
}

const updateImgProcessor = {
    deleteAllProductImg : async(req,res,next) => {
        try{
            const productId = req.params.productId;
            const productData = await db.oneOrNone(`
            SELECT p.product_id, p.mitra_id,
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
            
            if(productImage){
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
            }
            req.folderName = mitraId
            next()
        }catch(err){
            console.error(err);
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    },
    deleteAllImgForumCustomer: async(req, res, next) => {
        try{
            const forumCustomerId = req.params.forumCustomerId;
            const forumCustomerData = await db.oneOrNone(`
                    SELECT fc.forum_customers_id, fc.user_id, 
                            json_agg(json_build_object('image_id', fci.image_id, 'image_path', i.image_path, 'image_name', i.image_name)) as image
                    FROM forum_customers fc 
                    LEFT JOIN forum_customer_image fci ON fc.forum_customers_id = fci.forum_id 
                    LEFT JOIN images i ON fci.image_id = i.image_id 
                    WHERE fc.forum_customers_id = $1
                    GROUP BY fc.forum_customers_id; 
                `, forumCustomerId);
            const userId = forumCustomerData['user_id'];
            const forumImage = forumCustomerData['image'][0]['image_id'] != null ? forumCustomerData['images'].map((image) => {
                return image.image_name
            }) : false;

            if(forumImage){
                for(let i = 0; i < forumImage.length; i++){
                    fs.unlink(path.join('public', 'img', 'forum_customer', `${userId}`, `${forumImage[i]}`), (err)=>{
                        if(err){
                            return res.status(500).json({
                                message: "Update image Forum failed"
                            });
                        }
                    });
                    await db.none(`
                        DELETE FROM images WHERE image_name = $1
                    `, forumImage[i]);
                }
                await db.none(`
                    DELETE FROM forum_customer_image WHERE forum_id = $1
                `, forumCustomerId)
            }
            req.folderName = userId;
            next();
        }catch(err){
            console.error(err);
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    },
    deleteAllImgForumMitra: async(req, res, next) => {
        try{
            const forumMitraId = req.params.forumMitraId;
            const forumData = await db.oneOrNone(`
            SELECT fm.title, fm.content, fm.mitra_id, 
                    json_agg(json_build_object('image_id', fmi.image_id, 'image_path', i.image_path, 'image_name', i.image_name)) as image
            FROM forum_mitras fm 
            LEFT JOIN forum_mitras_image fmi ON fm.forum_mitra_id = fmi.forum_id 
            LEFT JOIN images i ON fmi.image_id = i.image_id 
            WHERE forum_mitra_id = $1 
            GROUP BY fm.forum_mitra_id;
            `, forumMitraId);
            const mitraId = forumData['mitra_id'];
            const forumImage = forumData['images'].map((image) => {
                return image.image_name
            })

            if(forumImage){
                for(let i=0; i < forumImage.length; i++){
                    fs.unlink(path.join('public','img','forum_mitra',`${mitraId}`,`${forumImage[i]}`), (err)=>{
                        if(err){
                            return res.status(500).json({
                                message: "Update Image Forum Failed"
                            });
                        }
                    });
                    await db.none(`
                        DELETE FROM images WHERE image_name = $1
                    `, forumImage[i]);
                }
                await db.none(`
                    DELETE FROM forum_customer_image WHERE forum_id = $1
                `, forumMitraId)
            }
            req.folderName = mitraId; 
            next()
        }catch(err){
            console.error(err);
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    },
    deleteProfileImg: async(req, res, next) => {
        next()
    }
}

module.exports = {storage, updateImgProcessor}