const createForumsTable = `
  CREATE TABLE IF NOT EXISTS forums (
    forum_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    type VARCHAR(10) NOT NULL,
    title VARCHAR(100) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT NOW()
  );
`;

module.exports = createForumsTable;