const createMitrasTable = `
    CREATE TABLE IF NOT EXISTS mitras (
    mitra_id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) REFERENCES users(user_id),
    mitra_name VARCHAR(100) NOT NULL,
    type VARCHAR(10) NOT NULL,
    address VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );
`

module.exports = createMitrasTable;