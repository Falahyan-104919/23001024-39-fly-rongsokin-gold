const additionalQuery = `
BEGIN ;
ALTER TABLE users ALTER COLUMN status SET DEFAULT TRUE;
COMMIT;
`;

module.exports = additionalQuery;
