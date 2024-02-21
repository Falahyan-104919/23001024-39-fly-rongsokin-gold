const createMitrasTable = `
    CREATE TABLE IF NOT EXISTS mitras (
      mitra_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID REFERENCES users(user_id),
      mitra_type_id UUID REFERENCES mitra_type(mitra_type_id),
      mitra_name VARCHAR(100) NOT NULL,
      bank_name VARCHAR(100) NOT NULL,
      bank_number NUMERIC NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
  );
`;

module.exports = createMitrasTable;
