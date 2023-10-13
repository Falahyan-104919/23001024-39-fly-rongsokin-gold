const createImagesTable = `
  CREATE TABLE IF NOT EXISTS images (
    image_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    image_path VARCHAR(255) NOT NULL,
    image_name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
  );
`;

module.exports = createImagesTable;