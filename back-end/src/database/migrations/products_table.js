const createProductsTable = `
  CREATE TABLE IF NOT EXISTS products (
    product_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mitra_id UUID REFERENCES mitras(mitra_id),
    product_type_id UUID REFERENCES product_type(product_type_id),
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    unit VARCHAR(128) NOT NULL,
    price NUMERIC NOT NULL,
    quantity NUMERIC NOT NULL,
    minimum_order NUMERIC NOT NULL,
    status BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );
`;

module.exports = createProductsTable;
