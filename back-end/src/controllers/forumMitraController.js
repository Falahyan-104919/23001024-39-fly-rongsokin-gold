const { db } = require('../database/db');

const forumMitraController = {
  getAllForumMitra: async (req, res) => {
    try {
      const forumMitraData = await db.manyOrNone(`
                SELECT fm.forum_mitra_id, fm.title, fm.content, fm.updated_at, fm.mitra_id, u.fullname, u.email,
                        json_agg(json_build_object('image_id', fmi.image_id, 'image_path', i.image_path, 'image_name', i.image_name)) as image
                FROM forum_mitras fm 
                LEFT JOIN mitras m ON fm.mitra_id = m.mitra_id
                LEFT JOIN users u ON m.user_id = u.user_id
                LEFT JOIN forum_mitras_image fmi ON fm.forum_mitra_id = fmi.forum_id 
                LEFT JOIN images i ON fmi.image_id = i.image_id 
                GROUP BY fm.forum_mitra_id, u.fullname, u.email
            `);

      res.status(200).json({
        message: 'Succesfull Fetching Forum Mitra Data',
        data: forumMitraData,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
  getForumMitra: async (req, res) => {
    try {
      const forumMitraId = req.params.forumMitraId;
      const forumMitraData = await db.one(
        `
                SELECT fm.forum_mitra_id, fm.title, fm.content, fm.updated_at, fm.mitra_id, 
                        json_agg(json_build_object('image_id', fmi.image_id, 'image_path', i.image_path, 'image_name', i.image_name)) as image
                FROM forum_mitras fm 
                LEFT JOIN forum_mitras_image fmi ON fm.forum_mitra_id = fmi.forum_id 
                LEFT JOIN images i ON fmi.image_id = i.image_id 
                WHERE forum_mitra_id = $1 
                GROUP BY fm.forum_mitra_id;
            `,
        forumMitraId
      );

      res.status(200).json({
        message: 'Succesfull Fetching Forum Mitra Data',
        data: forumMitraData,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
  postForumMitra: async (req, res) => {
    try {
      const mitraId = req.params.mitraId;
      const { title, content } = req.body;
      const forumImg = req.files;
      const userId = await db.oneOrNone(
        `
                SELECT user_id FROM mitras WHERE mitra_id = $1
            `,
        mitraId
      );

      const newForum = await db.one(
        `
                INSERT INTO forum_mitras(mitra_id, title, content) 
                VALUES ($1,$2,$3) RETURNING forum_mitra_id
            `,
        [mitraId, title, content]
      );

      if (forumImg) {
        for (let i = 0; i < forumImg.length; i++) {
          const image = forumImg[i];
          const newImage = await db.one(
            `
                        INSERT INTO images (user_id, image_path, image_name)
                        VALUES ($1,$2,$3) RETURNING image_id
                    `,
            [userId.user_id, image.path, image.filename]
          );

          await db.none(
            `
                        INSERT INTO forum_mitras_image(forum_id, image_id)
                        VALUES ($1, $2)
                    `,
            [newForum.forum_mitra_id, newImage.image_id]
          );
        }
      }

      res.status(201).json({
        message: 'Created Forum Mitra Succesfull',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
  updateForumMitra: async (req, res) => {
    try {
      const forumMitraId = req.params.forumMitraId;
      const { mitraId, title, content } = req.body;
      const forumMitraImg = req.files;
      const userId = await db.oneOrNone(
        `
                SELECT user_id FROM mitras WHERE mitra_id = $1
            `,
        mitraId
      );

      const updatedForum = await db.one(
        `
                UPDATE forum_mitras SET 
                title = $1, content = $2, updated_at = NOW()
                WHERE forum_mitra_id = $3 RETURNING forum_mitra_id
            `,
        [title, content, forumMitraId]
      );

      if (forumMitraImg) {
        for (let i = 0; i < forumMitraImg.length; i++) {
          const image = forumMitraImg[i];
          const newImage = await db.one(
            `
                        INSERT INTO images(user_id, image_path, image_name) 
                        VALUES ($1,$2,$3) RETURNING image_id
                    `,
            [userId.user_id, image.path, image.filename]
          );

          await db.none(
            `
                        INSERT INTO forum_mitras_image(forum_id, image_id)
                        VALUES ($1, $2)
                    `,
            [updatedForum.forum_mitra_id, newImage.image_id]
          );
        }
      }

      res.status(201).json({
        message: 'Update Forum Mitra Succesfull',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
  getMitraForumActivity: async (req, res) => {
    try {
      const { mitraId } = req.params;
      const mitraActivity = await db.manyOrNone(
        `
      SELECT fm.forum_mitra_id, fm.mitra_id, fm.title, fm.content, fm.updated_at, u.fullname, u.email, json_agg(json_build_object('image_path', i.image_path, 'image_name', i.image_name, 'image_id', i.image_id)) AS images FROM forum_mitras AS fm 
      LEFT JOIN mitras m ON fm.mitra_id = m.mitra_id
      LEFT JOIN users u ON m.user_id = u.user_id 
      LEFT JOIN images i ON m.user_id = i.user_id
      WHERE fm.mitra_id = $1 
      GROUP BY fm.forum_mitra_id, u.fullname, u.email
      `,
        [mitraId]
      );

      res.status(200).json(mitraActivity);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
};

module.exports = forumMitraController;
