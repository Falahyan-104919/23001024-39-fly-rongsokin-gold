const { db } = require('../database/db');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authController = {
  registerUser: async (req, res) => {
    try {
      const { fullname, email, phoneNumber, password } = req.body;

      const existingUser = await db.oneOrNone(
        `
          SELECT * from users 
          WHERE email = $1
        `,
        email
      );

      if (existingUser != null) {
        return res.status(409).json({
          message: 'Email already exists',
        });
      }

      const hashedPassword = await bcryptjs.hash(password, 10);

      db.none(
        `
          INSERT INTO users (fullname, email, phone_number, role, password_hash)
          VALUES ($1, $2, $3, $4, $5);
        `,
        [fullname, email, phoneNumber, 'user', hashedPassword]
      );

      return res.status(201).json({
        message: 'User Registration Successfull',
      });
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await db.oneOrNone(
        `
          SELECT u.*, 
          json_agg(json_build_object('image_id', i.image_id, 'image_path', i.image_path, 'image_name', i.image_name)) as image_profile 
          from users u 
          LEFT JOIN user_image ui ON u.user_id = ui.user_id
          LEFT JOIN images i ON ui.image_id = i.image_id
          WHERE email = $1 
          GROUP BY u.user_id
        `,
        email
      );

      if (user == null) {
        return res.status(404).json({
          message: 'User not Found',
        });
      }

      const passwordMatch = await bcryptjs.compare(
        password,
        user.password_hash
      );

      if (!passwordMatch) {
        return res.status(401).json({
          message: 'Invalid Password',
        });
      }

      const token = jwt.sign(
        {
          userId: user.user_id,
        },
        process.env.JWT_SECRET
      );

      let userData = {
        userId: user.user_id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phone_number,
        role: user.role,
        image_profile: user.image_profile,
      };

      const mitra = await db.oneOrNone(
        `
          SELECT * from mitras 
          WHERE user_id = $1
        `,
        user.user_id
      );

      if (mitra) {
        userData.mitraId = mitra.mitra_id;
        userData.mitraType = mitra.type;
      }

      return res.status(200).json({
        message: 'Authentication is Successfull',
        userData,
        token: token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
};
module.exports = authController;
