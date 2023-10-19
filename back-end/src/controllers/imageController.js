const { db } = require('../database/db');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('File type not supported'), false);
    }
  };

const storageProductImg = multer.diskStorage({
    destination: (req, res, cb) => {
        const productId = req.params.productId;
        const uploadDir = path.join(__dirname, 'public', 'images', 'products', `${productId}`);
        if(!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir, {recursive: true});
        }
        cb(null, uploadDir);
    },
    filename: (req, res, cb) => {
        const uniqueFileName = `${Date.now()}`;
        cb(null, uniqueFileName)
    }
});

const storageForumCustomerImg = multer.diskStorage({
    destination: (req, res, cb) => {
        const forumId = req.params.forumId;
        const uploadDir = path.join(__dirname, 'public', 'images', 'forums_customer', `${forumId}`);
        if(!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir, {recursive: true});
        }
        cb(null, uploadDir);
    },
    filename: (req, res, cb) => {
        const uniqueFileName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueFileName)
    }
});

const storageForumMitraImg = multer.diskStorage({
    destination: (req, res, cb) => {
        const forumId = req.params.forumId;
        const uploadDir = path.join(__dirname, 'public', 'images', 'forums_customer', `${forumId}`);
        if(!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir, {recursive: true});
        }
        cb(null, uploadDir);
    },
    filename: (req, res, cb) => {
        const uniqueFileName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueFileName)
    }
});


const storageProfileImg = multer.diskStorage({
    destination: (req, res, cb) => {
        const userId = req.params.userId;
        const uploadDir = path.join(__dirname, 'public', 'images', 'profile_picture', `${userId}`);
        if(!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir, {recursive: true});
        }
        cb(null, uploadDir);
    },
    filename: (req, res, cb) => {
        const uniqueFileName = `${Date.now()}-${userId}`;
        cb(null, uniqueFileName)
    }
});


const imageController = {
    uploadProfileImg: async(req,res) => {
        const uploadProfilImg = multer({ storage: storageProfileImg , fileFilter: fileFilter}).single('profileImg');
        uploadProfilImg(req, res, async(err) => {
            if(err instanceof multer.MulterError){
                return res.status(500).json({
                    message: err.message
                })
            } else if (err){
                return res.status(500).json({
                    message: "Failed to upload profile image"
                })
            }
        })
        
    },
    uploadMitraForumImg: async(req,res) => {
        const uploadForumCustomerImg = multer({ storage: storageForumCustomerImg , fileFilter: fileFilter}).array('forumImg');
        uploadForumCustomerImg(req, res, async(err)=>{
            if(err instanceof multer.MulterError){
                return res.status(500).json({
                    message: err.message
                })
            } else if (err){
                return res.status(500).json({
                    message: "Failed to upload forum image"
                })
            }
        })
        
    },
    uploadCustomerForumImg: async(req,res) => {
        const uploadForumMitraImg = multer({ storage: storageForumMitraImg , fileFilter: fileFilter}).array('forumImg');
        uploadForumMitraImg(req,res, async(err) => {
            if(err instanceof multer.MulterError){
                return res.status(500).json({
                    message: err.message
                })
            } else if (err){
                return res.status(500).json({
                    message: "Failed to upload forum image"
                })
            }
        })
        
    },
    uploadProductImg: async(req,res, next) => {
        console.log("INI MIDDLEWARE");
        const uploadProductImg = multer({ storage: storageProductImg }).array('productImg');
        console.log(uploadProductImg,'\n',req.body,'\n',req.file);
        uploadProductImg(req, res, async (err) => {
            if(err instanceof multer.MulterError){
                return res.status(500).json({
                    message: err.message
                })
            } else if (err){
                return res.status(500).json({
                    message: 'Failed to upload product image'
                })
            }
        });
        next()
    }
}

module.exports = imageController;