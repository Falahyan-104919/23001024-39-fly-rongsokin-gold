const createForumCustomersTable = `
  CREATE TABLE IF NOT EXISTS forum_customers (
    forum_customers_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(user_id),
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    status BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );
`;

module.exports = createForumCustomersTable;
