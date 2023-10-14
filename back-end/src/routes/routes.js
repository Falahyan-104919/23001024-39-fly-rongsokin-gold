const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const forumRoutes = require('./forumRoutes');


router.use('/', userRoutes);
router.use('/', forumRoutes);


module.exports = router;