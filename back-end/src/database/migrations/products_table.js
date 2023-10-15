const createProductsTable = `
  CREATE TABLE IF NOT EXISTS products (
    product_id VARCHAR(50) PRIMARY KEY,
    mitra_id VARCHAR(50) REFERENCES mitras(mitra_id),
    name VARCHAR(100) NOT NULL,
    product_type VARCHAR(25) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  );
`;

module.exports = createProductsTable;