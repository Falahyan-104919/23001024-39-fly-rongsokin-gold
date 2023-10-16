const createImagesTable = `
  CREATE TABLE IF NOT EXISTS images (
    image_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(user_id),
    image_path VARCHAR(255) NOT NULL,
    image_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  );
`;

module.exports = createImagesTable;