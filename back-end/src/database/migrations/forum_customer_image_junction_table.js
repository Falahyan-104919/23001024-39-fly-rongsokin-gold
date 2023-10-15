const createForumCustomerImageTableJunction = `
CREATE TABLE IF NOT EXISTS forum_customer_image (
    forum_id VARCHAR(50) REFERENCES forum_customers(forum_customers_id),
    image_id VARCHAR(50) REFERENCES images(image_id)
  );
`

module.exports = createForumCustomerImageTableJunction;