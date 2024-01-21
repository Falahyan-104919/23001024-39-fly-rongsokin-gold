const { db } = require('../database/db');
const fs = require('fs');
const path = require('path');

const productController = {
  postProduct: async (req, res) => {
    try {
      const mitraId = req.params.mitraId;
      const { name, productType, description, price, quantity } = req.body;
      const productImg = req.file;
      const newProduct = await db.one(
        `
                INSERT INTO products (mitra_id, name, product_type_id, description, price, quantity) 
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING product_id
            `,
        [mitraId, name, productType, description, price, quantity]
      );

      const newImage = await db.one(
        `
                    INSERT INTO images(image_path, image_name) 
                    VALUES($1, $2) 
                    RETURNING image_id
                `,
        [productImg.path, productImg.filename]
      );

      await db.none(
        `
                    INSERT INTO product_image(product_id, image_id)
                    VALUES ($1, $2)
                `,
        [newProduct.product_id, newImage.image_id]
      );

      res.status(201).json({ msg: 'success' });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
  getProduct: async (req, res) => {
    try {
      const productId = req.params.productId;

      const productData = await db.oneOrNone(
        `
              SELECT p.product_id, p.mitra_id, p.name, pt.name AS product_type, p.description, p.price, p.quantity, 
                     json_agg(json_build_object('image_id', pi.image_id, 'image_path', i.image_path, 'image_name', i.image_name)) as images
              FROM products p
              LEFT JOIN product_type pt ON p.product_type_id = pt.product_type_id
              LEFT JOIN product_image pi ON p.product_id = pi.product_id
              LEFT JOIN images i ON pi.image_id = i.image_id
              WHERE p.product_id = $1 AND p.status
              GROUP BY p.product_id, pt.name;
            `,
        [productId]
      );

      if (!productData) {
        return res.status(404).json({ message: 'Product not found' });
      }

      const productOwner = await db.oneOrNone(
        `
          SELECT m.mitra_id, u.phone_number, m.mitra_name, m.address, mt.type 
          FROM mitras as m
          LEFT JOIN mitra_type mt ON m.mitra_type_id = mt.mitra_type_id
          LEFT JOIN users as u ON u.user_id =  m.user_id 
          WHERE m.mitra_id = $1 
      `,
        [productData.mitra_id]
      );

      if (!productOwner) {
        return res.status(404).json({
          message: 'Mitra tidak ditemukan',
        });
      }

      res.status(200).json({ productData, productOwner });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error', error: error });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { productId } = req.params;
      const { name, productType, description, price, quantity } = req.body;
      const productImg = req.file;

      await db.none(
        `
                UPDATE products SET 
                name = $1, product_type_id = $2, description = $3, price = $4, quantity = $5 
                WHERE product_id = $6
            `,
        [name, productType, description, price, quantity, productId]
      );

      if (productImg) {
        const product = await db.one(
          `
            SELECT pi.image_id, p.mitra_id, i.image_name FROM products as p 
            LEFT JOIN mitras m ON p.mitra_id = m.mitra_id
            LEFT JOIN product_image pi ON p.product_id = pi.product_id
            LEFT JOIN images i ON pi.image_id = i.image_id
            WHERE p.product_id = $1
            GROUP BY p.product_id, pi.image_id, i.image_name
        `,
          [productId]
        );

        fs.unlinkSync(
          path.join(
            'public',
            'img',
            'products',
            `${product.mitra_id}`,
            `${product.image_name}`
          )
        );

        await db.none(
          `
            UPDATE images SET image_path = $1 , image_name = $2 WHERE image_id = $3;
          `,
          [productImg.path, productImg.filename, product.image_id]
        );
      }

      res.status(203).json({
        message: 'Product Update Successfull',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { productId } = req.params;
      await db.none(
        `
      UPDATE products p SET
      status = false WHERE product_id = $1
    `,
        [productId]
      );
      res.status(203).json({
        message: 'Delete Product Successfuly!',
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
  getAllProduct: async (req, res) => {
    try {
      const productData = await db.manyOrNone(`
              SELECT p.mitra_id, p.product_id, p.name, pt.name AS product_type, p.description, p.price, p.quantity, 
                     json_agg(json_build_object('image_id', pi.image_id, 'image_path', i.image_path,'image_name', i.image_name)) as images
              FROM products p
              LEFT JOIN product_type pt ON p.product_type_id = pt.product_type_id
              LEFT JOIN product_image pi ON p.product_id = pi.product_id
              LEFT JOIN images i ON pi.image_id = i.image_id
              WHERE p.status
              GROUP BY p.product_id, pt.name;
            `);

      res.status(200).json({
        message: 'Fetching All Product Data Successfully',
        products: productData,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  getMitraProducts: async (req, res) => {
    try {
      const { mitraId } = req.params;
      const productData = await db.manyOrNone(
        `
              SELECT p.mitra_id, p.product_id, p.name, pt.product_type_id, pt.name AS product_type, p.description, p.price, p.quantity, 
                     json_agg(json_build_object('image_id', pi.image_id, 'image_path', i.image_path,'image_name', i.image_name)) as images
              FROM products p
              LEFT JOIN product_type pt ON p.product_type_id = pt.product_type_id
              LEFT JOIN product_image pi ON p.product_id = pi.product_id
              LEFT JOIN images i ON pi.image_id = i.image_id
              WHERE p.mitra_id = $1 AND p.status
              GROUP BY p.product_id, pt.product_type_id, pt.name;
            `,
        [mitraId]
      );
      res.status(200).json({
        message: 'Fetching My Products Successfull',
        product_data: productData,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
  getProductByName: async (req, res) => {
    try {
      const { name } = req.query;
      const keyword = '%' + name + ' %';
      const products = await db.manyOrNone(
        `
        SELECT p.mitra_id, p.product_id, p.name, pt.name AS product_type, p.description, p.price, p.quantity, 
        json_agg(json_build_object('image_id', pi.image_id, 'image_path', i.image_path,'image_name', i.image_name)) as images
        FROM products p
        LEFT JOIN product_type pt ON p.product_type_id = pt.product_type_id
        LEFT JOIN product_image pi ON p.product_id = pi.product_id
        LEFT JOIN images i ON pi.image_id = i.image_id
        WHERE p.name ILIKE $1 AND p.status
        GROUP BY p.product_id, pt.name;
      `,
        [keyword]
      );
      res.json(products);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
  getProductType: async (req, res) => {
    try {
      const { type } = req.query;
      if (!type)
        return res.status(400).json({
          message: 'Bad Request',
        });
      const productTypes = await db.manyOrNone(
        `
        SELECT pt.product_type_id, pt.name FROM product_type pt
          LEFT JOIN mitra_type mt ON pt.mitra_type_id = mt.mitra_type_id
          WHERE mt.type = $1
      `,
        [type]
      );
      res.status(200).json({ productTypes });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
};

module.exports = productController;
