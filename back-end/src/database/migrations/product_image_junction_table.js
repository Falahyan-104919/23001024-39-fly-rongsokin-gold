const createProductImageTableJunction = `
CREATE TABLE IF NOT EXISTS product_image (
    product_id VARCHAR(50) REFERENCES products(product_id),
    image_id VARCHAR(50) REFERENCES images(image_id)
  );
`

module.exports = createProductImageTableJunction;