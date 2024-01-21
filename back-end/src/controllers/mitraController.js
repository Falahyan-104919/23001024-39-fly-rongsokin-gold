const { db } = require('../database/db');

const mitraController = {
  updateProfileMitra: async (req, res) => {
    try {
      const { mitraId } = req.params;
      const { mitra_name, type, address } = req.body;

      const mitraExist = await db.one(
        `
        SELECT mitra_id FROM mitras WHERE mitra_id = $1
      `,
        mitraId
      );

      if (mitraExist) {
        await db.none(
          `
          UPDATE mitras SET 
          mitra_name = $1,
          type = $2,
          address = $3
          WHERE mitra_id = $4
        `,
          [mitra_name, type, address, mitraId]
        );
        return res.status(201).json({
          message: 'Update Mitra Profile Successfully',
        });
      }

      res.status(404).json({
        message: 'Mitra Profile Not Found',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
  deleteMitra: async (req, res) => {},
  getMitraProfile: async (req, res) => {
    try {
      const { mitraId } = req.params;
      const mitraData = await db.oneOrNone(
        `
        SELECT m.mitra_id, m.mitra_name, mt.type as type, m.address, m.user_id, u.fullname, u.phone_number, u.email,
         json_agg(json_build_object('image_path', i.image_path, 'image_id', i.image_id, 'image_name', i.image_name)) as profile_image
         FROM mitras as m 
        LEFT JOIN mitra_type mt ON m.mitra_type_id = mt.mitra_type_id
        LEFT JOIN users u ON m.user_id = u.user_id
        LEFT JOIN user_image ui ON u.user_id = ui.user_id
        LEFT JOIN images i on ui.image_id = i.image_id
        WHERE m.mitra_id = $1
        GROUP BY m.mitra_id, u.fullname, u.phone_number, u.email, mt.type
    `,
        [mitraId]
      );
      res.status(200).json({
        message: 'Fetch Mitra Data Successfulll',
        data: mitraData,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
  getMitraProfileWithUserId: async (req, res) => {
    try {
      const { userId } = req.params;
      const mitraData = await db.oneOrNone(
        `
        SELECT m.mitra_id, m.mitra_name, mt.type as type, m.address, m.user_id, u.fullname, u.phone_number, u.email, 
        json_agg(json_build_object('image_path', i.image_path, 'image_id', i.image_id, 'image_name', i.image_name)) as images 
        FROM mitras as m 
        LEFT JOIN mitra_type mt ON m.mitra_type_id = mt.mitra_type_id
        LEFT JOIN users u ON m.user_id = u.user_id
        LEFT JOIN user_image ui ON u.user_id = ui.user_id
        LEFT JOIN images i on ui.image_id = i.image_id
        WHERE m.user_id = $1
        GROUP BY m.mitra_id, u.fullname, u.phone_number, u.email, mt.type
    `,
        [userId]
      );
      res.status(200).json({
        message: 'Fetch Mitra Data Successfulll',
        data: mitraData,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
  getMitraType: async (req, res) => {
    try {
      const mitraType = await db.manyOrNone(`
        SELECT * from mitra_type
        WHERE status;
      `);
      res.status(200).json({
        mitraType,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
};

module.exports = mitraController;
