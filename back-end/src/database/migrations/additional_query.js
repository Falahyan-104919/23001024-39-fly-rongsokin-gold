const additionalQuery = `
BEGIN ;
ALTER TABLE users ALTER COLUMN status SET DEFAULT TRUE;
ALTER TABLE products ALTER COLUMN status SET DEFAULT TRUE;
ALTER TABLE forum_customers ALTER COLUMN status SET DEFAULT TRUE;
ALTER TABLE forum_mitras ALTER COLUMN status SET DEFAULT TRUE;
COMMIT;
`;

module.exports = additionalQuery;
