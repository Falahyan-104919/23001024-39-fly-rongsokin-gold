const createProductImageTableJunction = `
CREATE TABLE IF NOT EXISTS product_image (
    product_id UUID REFERENCES products(product_id),
    image_id UUID REFERENCES images(image_id)
  );
`

module.exports = createProductImageTableJunction;