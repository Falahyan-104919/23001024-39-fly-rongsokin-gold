const createForumMitrasTable = `
    CREATE TABLE IF NOT EXISTS forum_mitras (
    forum_mitra_id VARCHAR(50) PRIMARY KEY,
    mitra_id VARCHAR(50) REFERENCES mitras(mitra_id),
    title VARCHAR(100) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );
`
module.exports = createForumMitrasTable;