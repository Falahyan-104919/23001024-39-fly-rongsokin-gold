const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    fullname VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number NUMERIC(15,0) NOT NULL,
    password_hash VARCHAR(60) NOT NULL,
    role VARCHAR(10) NOT NULL,
    status BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );
`;

module.exports = createUsersTable;
