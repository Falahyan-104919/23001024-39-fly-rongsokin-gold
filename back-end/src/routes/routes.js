const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const mitraRoutes = require('./mitraRoutes');


router.use('/', userRoutes);
router.use('/', mitraRoutes);


module.exports = router;