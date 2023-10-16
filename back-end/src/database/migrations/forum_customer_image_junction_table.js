const createForumCustomerImageTableJunction = `
CREATE TABLE IF NOT EXISTS forum_customer_image (
    forum_id UUID REFERENCES forum_customers(forum_customers_id),
    image_id UUID REFERENCES images(image_id)
  );
`

module.exports = createForumCustomerImageTableJunction;