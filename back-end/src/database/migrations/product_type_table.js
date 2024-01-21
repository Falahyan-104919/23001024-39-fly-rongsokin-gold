const createProductType = `
    CREATE TABLE IF NOT EXISTS product_type (
        product_type_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        mitra_type_id UUID REFERENCES mitra_type(mitra_type_id),
        name VARCHAR(100) NOT NULL,
        status BOOLEAN NOT NULL
    );
`;

module.exports = createProductType;
