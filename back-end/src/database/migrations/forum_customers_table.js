const createForumCustomersTable = `
  CREATE TABLE IF NOT EXISTS forum_customers (
    forum_customers_id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) REFERENCES users(user_id),
    title VARCHAR(100) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );
`;

module.exports = createForumCustomersTable;