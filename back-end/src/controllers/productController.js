const { db } = require('../database/db');
const fs = require('fs');
const path = require('path');

const productController = {
  postProduct: async (req, res) => {
    try {
      const mitraId = req.params.mitraId;
      const { name, productType, description, price, quantity } = req.body;
      const productImg = req.file;
      console.log(productImg);
      const newProduct = await db.one(
        `
                INSERT INTO products (mitra_id, name, product_type, description, price, quantity) 
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
              SELECT p.product_id, p.mitra_id, p.name, p.product_type, p.description, p.price, p.quantity, 
                     json_agg(json_build_object('image_id', pi.image_id, 'image_path', i.image_path, 'image_name', i.image_name)) as images
              FROM products p
              LEFT JOIN product_image pi ON p.product_id = pi.product_id
              LEFT JOIN images i ON pi.image_id = i.image_id
              WHERE p.product_id = $1
              GROUP BY p.product_id;
            `,
        [productId]
      );

      if (!productData) {
        return res.status(404).json({ message: 'Product not found' });
      }

      const productOwner = await db.oneOrNone(
        `
          SELECT m.mitra_id, u.phone_number, m.mitra_name, m.address, m.type 
          FROM mitras as m
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
                name = $1, product_type = $2, description = $3, price = $4, quantity = $5 
                WHERE product_id = $6
            `,
        [name, productType, description, price, quantity, productId]
      );

      if (productImg) {
        const product = await db.one(
          `
            SELECT pi.image_id FROM products as p 
            LEFT JOIN product_image pi ON p.product_id = pi.product_id
            WHERE p.product_id = $1
            GROUP BY p.product_id, pi.image_id
        `,
          [productId]
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
  deleteProduct: async (req, res) => {},
  getAllProduct: async (req, res) => {
    try {
      const productData = await db.manyOrNone(`
              SELECT p.mitra_id, p.product_id, p.name, p.product_type, p.description, p.price, p.quantity, 
                     json_agg(json_build_object('image_id', pi.image_id, 'image_path', i.image_path,'image_name', i.image_name)) as images
              FROM products p
              LEFT JOIN product_image pi ON p.product_id = pi.product_id
              LEFT JOIN images i ON pi.image_id = i.image_id
              GROUP BY p.product_id;
            `);

      res.status(200).json({
        message: 'Fetching All Product Data Successfully',
        products: productData,
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  getMitraProducts: async (req, res) => {
    try {
      const { mitraId } = req.params;
      const productData = await db.manyOrNone(
        `
              SELECT p.mitra_id, p.product_id, p.name, p.product_type, p.description, p.price, p.quantity, 
                     json_agg(json_build_object('image_id', pi.image_id, 'image_path', i.image_path,'image_name', i.image_name)) as images
              FROM products p
              LEFT JOIN product_image pi ON p.product_id = pi.product_id
              LEFT JOIN images i ON pi.image_id = i.image_id
              WHERE p.mitra_id = $1
              GROUP BY p.product_id;
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
        SELECT p.mitra_id, p.product_id, p.name, p.product_type, p.description, p.price, p.quantity, 
        json_agg(json_build_object('image_id', pi.image_id, 'image_path', i.image_path,'image_name', i.image_name)) as images
        FROM products p
        LEFT JOIN product_image pi ON p.product_id = pi.product_id
        LEFT JOIN images i ON pi.image_id = i.image_id
        WHERE p.name ILIKE $1
        GROUP BY p.product_id;
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
};

module.exports = productController;
