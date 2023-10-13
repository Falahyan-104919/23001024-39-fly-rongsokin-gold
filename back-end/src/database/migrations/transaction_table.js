const createTransactionsTable = `
  CREATE TABLE IF NOT EXISTS transactions (
    transaction_id SERIAL PRIMARY KEY,
    buyer_id INT REFERENCES users(user_id),
    mitra_id INT REFERENCES users(user_id),
    product_id INT REFERENCES products(product_id),
    transaction_status VARCHAR(10) NOT NULL,
    transaction_date TIMESTAMP DEFAULT NOW(),
    quantity INT NOT NULL,
    total_price DECIMAL(12, 2) NOT NULL
  );
`;

module.exports = createTransactionsTable;