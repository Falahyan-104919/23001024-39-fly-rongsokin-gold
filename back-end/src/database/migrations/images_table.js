const createImagesTable = `
  CREATE TABLE IF NOT EXISTS images (
    image_id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) REFERENCES users(user_id),
    image_path VARCHAR(255) NOT NULL,
    image_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  );
`;

module.exports = createImagesTable;