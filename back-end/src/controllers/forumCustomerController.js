const { db } = require('../database/db');

const forumCustomerController = {
  getAllForumCustomer: async (req, res) => {
    try {
      const forumCustomerData = await db.manyOrNone(`
                SELECT fc.forum_customers_id, fc.user_id, fc.title, fc.content, fc.updated_at, u.fullname, u.email,
                        json_agg(json_build_object('image_id', fci.image_id, 'image_path', i.image_path, 'image_name', i.image_name)) as image
                FROM forum_customers fc 
                LEFT JOIN users u ON fc.user_id = u.user_id
                LEFT JOIN forum_customer_image fci ON fc.forum_customers_id = fci.forum_id 
                LEFT JOIN images i ON fci.image_id = i.image_id 
                GROUP BY fc.forum_customers_id, u.fullname, u.email; 
            `);

      res.status(200).json({
        message: 'Fetching All Forum Customers Data Successfully',
        data: forumCustomerData,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
  getForumCustomer: async (req, res) => {
    try {
      const forumCustomerId = req.params.forumCustomerId;

      const forumCustomerData = await db.manyOrNone(
        `
                SELECT fc.forum_customers_id, fc.user_id, fc.title, fc.content, fc.updated_at, 
                        json_agg(json_build_object('image_id', fci.image_id, 'image_path', i.image_path, 'image_name', i.image_name)) as image
                FROM forum_customers fc 
                LEFT JOIN forum_customer_image fci ON fc.forum_customers_id = fci.forum_id 
                LEFT JOIN images i ON fci.image_id = i.image_id 
                WHERE fc.forum_customers_id = $1
                GROUP BY fc.forum_customers_id; 
            `,
        forumCustomerId
      );

      res.status(200).json({
        message: 'Fetching Forum Customers Data Successfully',
        data: forumCustomerData,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
  postForumCustomer: async (req, res) => {
    try {
      const userId = req.params.userId;
      const { title, content } = req.body;
      const forumImage = req.file;
      console.log(forumImage);
      const newForumCustomer = await db.one(
        `
                    INSERT INTO forum_customers (user_id, title, content)
                    VALUES ($1, $2, $3) RETURNING forum_customers_id
            `,
        [userId, title, content]
      );

      if (forumImage) {
        const newImage = await db.one(
          `
                            INSERT INTO images(image_path, image_name)
                            VALUES($1,$2) RETURNING image_id
                        `,
          [forumImage.path, forumImage.filename]
        );

        await db.none(
          `
                            INSERT INTO forum_customer_image(forum_id, image_id)
                            VALUES($1,$2)
                        `,
          [newForumCustomer.forum_customers_id, newImage.image_id]
        );
      }

      res.status(201).json({
        message: 'Creating Forum with Image Successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
  updateForumCustomer: async (req, res) => {
    try {
      const forumCustomerId = req.params.forumCustomerId;
      const { title, content } = req.body;
      const forumImage = req.files;

      const newUpdate = await db.one(
        `
                UPDATE forum_customers SET 
                title = $1, content = $2, updated_at = NOW()
                WHERE forum_customers_id = $3 RETURNING forum_customers_id, user_id
            `,
        [title, content, forumCustomerId]
      );
      if (forumImage) {
        for (let i = 0; i < forumImage.length; i++) {
          const image = forumImage[i];
          const newImage = await db.one(
            `
                        INSERT INTO images(image_path, image_name) 
                        VALUES ($1,$2) RETURNING image_id
                    `,
            [image.path, image.filename]
          );

          await db.none(
            `
                        INSERT INTO forum_customer_image(forum_id, image_id) 
                        VALUES($1,$2)
                    `,
            [newUpdate.forum_customers_id, newImage.image_id]
          );
        }
      }

      res.status(201).json({
        message: 'Update Forum Customer Successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
  deleteForumCustomer: async (req, res) => {},
  getUserForumActivity: async (req, res) => {
    try {
      const { userId } = req.params;
      const forumActivity = await db.manyOrNone(
        `
        SELECT fc.forum_customers_id, fc.user_id, fc.title, fc.content, fc.updated_at, u.fullname, u.email, 
        json_agg(json_build_object('image_path', i.image_path, 'image_name', i.image_name, 'image_id', i.image_id)) AS images 
        FROM forum_customers AS fc 
        LEFT JOIN users u ON fc.user_id = u.user_id 
        LEFT JOIN user_image ui ON u.user_id = ui.user_id
        LEFT JOIN forum_customer_image fci ON fc.forum_customers_id = fci.forum_id
        LEFT JOIN images i ON fci.image_id = i.image_id
        WHERE fc.user_id = $1 
        GROUP BY fc.forum_customers_id, u.fullname, u.email
      `,
        [userId]
      );
      res.status(200).json(forumActivity);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Internal Server Error',
        error: err,
      });
    }
  },
};

module.exports = forumCustomerController;
