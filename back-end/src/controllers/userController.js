const jwt = require('jsonwebtoken');
const { db } = require('../database/db');
const bcryptjs = require('bcryptjs');
require('dotenv').config();

const userController = {
  getAllUserProfile: async (req, res) => {
    try {
      const resData = await db.manyOrNone(`
          SELECT user_id, fullname, email, phone_number, role
          FROM users
        `);

      res.status(200).json({
        message: 'Fetching All User Data Successfull',
        data: resData,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },

  getUserProfile: async (req, res) => {
    try {
      const userId = req.params.userId;
      const userData = await db.one(
        `
          SELECT fullname, email, phone_number 
          FROM users WHERE user_id = $1
        `,
        [userId]
      );

      return res.status(200).json({
        message: 'Fetching User Data Successfull',
        data: userData,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },

  updateUserProfile: async (req, res) => {
    try {
      const userId = req.params.userId;
      const { fullname, email, phoneNumber } = req.body;
      const userExist = await db.oneOrNone(
        'SELECT user_id FROM users WHERE user_id = $1',
        userId
      );

      if (!userExist) {
        return res.status(404).json({ message: 'User not found!' });
      }

      await db.none(
        'UPDATE users SET fullname = $1, email = $2, phone_number = $3, updated_at = NOW() WHERE user_id = $4',
        [fullname, email, phoneNumber, userId]
      );

      return res
        .status(201)
        .json({ message: 'Successfully updated user profile' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userId = req.params.userId;

      await db.none(
        `
          DELETE FROM users
          WHERE user_id = $1;
        `,
        userId
      );

      return res.status(200).json({
        message: 'User Successfully Deleted',
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },

  updateUserPassword: async (req, res) => {
    try {
      const userId = req.params.userId;
      const { oldPassword, newPassword } = req.body;
      const userData = await db.one(
        `
          SELECT password_hash FROM users WHERE user_id = $1
        `,
        userId
      );
      const passwordValidation = await bcryptjs.compare(
        oldPassword,
        userData.password_hash
      );

      if (passwordValidation) {
        const newHashPassword = await bcryptjs.hash(newPassword, 10);
        await db.none(
          `
            UPDATE users SET password_hash = $1 WHERE user_id = $2
          `,
          [newHashPassword, userId]
        );
        return res.status(201).json({
          message: 'Password Succesfully Changed',
        });
      } else {
        return res.status(401).json({
          message: 'Invalid Password',
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },

  uploadProfileImg: async (req, res) => {
    try {
      const userId = req.params.userId;
      const profileImg = req.file;
      const newImageId = await db.oneOrNone(
        `
          INSERT INTO images(user_id, image_path, image_name)
          VALUES ($1,$2,$3) RETURNING image_id;
        `,
        [userId, profileImg.path, profileImg.filename]
      );

      await db.none(
        `
          UPDATE users SET image_id = $1 WHERE user_id = $2
        `,
        [newImageId.image_id, userId]
      );

      res.status(201).json({
        message: 'Change Profile Image Successfully',
      });
    } catch (error) {
      res.status(500).message({
        message: 'Internal Server Error!',
      });
    }
  },

  editProfileImg: async (req, res) => {
    try {
      const userId = req.params.userId;
      const profilImg = req.file;
      const newImageId = await db.oneOrNone(
        `
          INSERT INTO images(user_id, image_path, image_name) 
          VALUES ($1,$2,$3) RETURNING image_id;
        `,
        [userId, profilImg.path, profilImg.filename]
      );

      await db.none(
        `
          UPDATE users SET image_id = $1 WHERE user_id = $2
        `,
        [newImageId.image_id, userId]
      );

      res.status(201).json({
        message: 'Update Image Profile Successfull',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },

  becomeMitra: async (req, res) => {
    try {
      const userId = req.params.userId;
      const { mitraName, type, address } = req.body;

      await db.none(
        `
          UPDATE users SET role = 'mitra' WHERE user_id = $1 
        `,
        userId
      );

      const newMitra = await db.one(
        `
          INSERT INTO mitras (user_id, mitra_name, type, address) 
          VALUES ($1, $2, $3, $4) RETURNING mitra_id
        `,
        [userId, mitraName, type, address]
      );

      res.status(201).json({
        message: 'Become Mitra Successfull',
        data: {
          userId: userId,
          mitraId: newMitra.mitra_id,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
};

module.exports = userController;
