const createTransactionsTable = `
  CREATE TABLE IF NOT EXISTS transactions (
    transaction_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    buyer_id UUID REFERENCES users(user_id),
    mitra_id UUID REFERENCES mitras(mitra_id),
    product_id UUID REFERENCES products(product_id),
    transaction_status VARCHAR(10) NOT NULL,
    transaction_date TIMESTAMP DEFAULT NOW(),
    quantity INT NOT NULL,
    total_price DECIMAL(12, 2) NOT NULL
  );
`;

module.exports = createTransactionsTable;
