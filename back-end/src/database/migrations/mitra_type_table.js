const mitraTypeTable = `
    CREATE TABLE IF NOT EXISTS mitra_type (
        mitra_type_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        type VARCHAR(25) NOT NULL,
        status BOOLEAN NOT NULL
    );
`;

module.exports = mitraTypeTable;
