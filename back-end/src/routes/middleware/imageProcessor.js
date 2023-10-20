const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { error } = require('console');

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
    },
    deleteAllImgForumCustomer: async(req, res, next) => {
        next();
    },
    deleteAllImgForumMitra: async(req, res, next) => {
        next()
    },
    deleteProfileImg: async(req, res, next) => {
        next()
    }
}

module.exports = {storage, updateImgProcessor}