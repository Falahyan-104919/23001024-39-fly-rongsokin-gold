const createTransactionProducts = `
    CREATE TABLE IF NOT EXISTS transaction_product(
        transaction_id UUID REFERENCES transactions(transaction_id),
        product_id UUID REFERENCES products(product_id),
        quantity NUMERIC NOT NULL,
        price NUMERIC NOT NULL,
        PRIMARY KEY (transaction_id, product_id) 
    );
`;

module.exports = createTransactionProducts;
