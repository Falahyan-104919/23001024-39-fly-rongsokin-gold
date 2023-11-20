const additionalQuery = `
BEGIN ;
ALTER TABLE users ADD COLUMN IF NOT EXISTS image_id UUID;
ALTER TABLE users ADD CONSTRAINT fk_users_image FOREIGN KEY (image_id) REFERENCES images(image_id) ON DELETE SET NULL;
ALTER TABLE forum_customer_image DROP CONSTRAINT IF EXISTS forum_customer_image_image_id_fkey;
ALTER TABLE forum_mitras_image DROP CONSTRAINT IF EXISTS forum_mitras_image_image_id_fkey;
ALTER TABLE product_image DROP CONSTRAINT IF EXISTS product_image_image_id_fkey;
COMMIT;
`;

module.exports = additionalQuery;
