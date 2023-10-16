const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const mitraRoutes = require('./mitraRoutes');


router.use('/', authRoutes)
router.use('/', userRoutes);
router.use('/', mitraRoutes);


module.exports = router;