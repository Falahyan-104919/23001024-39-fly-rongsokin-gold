const { db } = require('../database/db');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const b64 = require('js-base64');
const axios = require('axios');
require('dotenv').config();

const authController = {
  registerUser: async (req, res) => {
    try {
      const { fullname, email, phoneNumber, address, password, token } =
        req.body;

      // console.log(token);
      const response = await axios.post(`
          https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_KEY}&response=${token}
        `);
      console.log(response.data);
      if (!response.data.success) {
        res.status(404).json({
          message: 'Anda Robot',
        });
      }

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
          INSERT INTO users (fullname, email, phone_number, address, password_hash, role)
          VALUES ($1, $2, $3, $4, $5, $6);
        `,
        [fullname, email, phoneNumber, address, hashedPassword, 'user']
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
        address: user.address,
        role: user.role,
        image_profile: user.image_profile,
      };

      const mitra = await db.oneOrNone(
        `
          SELECT m.*, mt.type from mitras m
            LEFT JOIN mitra_type mt ON m.mitra_type_id = mt.mitra_type_id
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
  forgotPassword: async (req, res) => {
    try {
      console.log('HIT!!!!');
      const { email } = req.body;
      const JWT_SECRET = process.env.JWT_SECRET;
      const GMAIL = process.env.GMAIL_USERNAME || 'scm.rongsokinid@gmail.com';
      const GMAIL_PASSWORD =
        process.env.GMAIL_PASSWORD || 'ilez fccv shak etii';

      const user = await db.oneOrNone(
        `
          SELECT user_id,email
          from users
          WHERE email = $1
        `,
        [email]
      );
      if (!user) {
        return res.status(404).json({
          message: 'User Not Found',
        });
      }

      const token = jwt.sign({ userId: user.user_id }, JWT_SECRET, {
        expiresIn: '15m',
      });
      const encodedToken = b64.encode(token);

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: GMAIL,
          pass: GMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: GMAIL,
        to: user.email,
        subject: 'Password Reset',
        text: `You requested a password reset. Click the link to reset your password : ${req.headers.origin}/reset_password/${encodedToken} \n Please note that this link is only Valid fot 15 minutes`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Email sent: ' + info.response);
      });

      res.status(200).json({
        message: 'Your Password Reset Link Successfully Sended',
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { token } = req.params;
      const { password } = req.body;

      const decoded_token = b64.decode(token);

      const decoded = jwt.verify(decoded_token, process.env.JWT_SECRET);
      const user = await db.oneOrNone(
        `
        SELECT * from users
        WHERE user_id = $1
      `,
        [decoded.userId]
      );
      if (!user) {
        return res.status(404).json({
          message: 'User not found',
          user_id: decoded,
        });
      }

      const hashedPassword = await bcryptjs.hash(password, 10);

      await db.none(
        `
        UPDATE users SET password_hash = $1 WHERE user_id = $2
      `,
        [hashedPassword, decoded.userId]
      );

      return res.status(200).json({
        message: 'Successfully Reset Password',
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
};
module.exports = authController;
