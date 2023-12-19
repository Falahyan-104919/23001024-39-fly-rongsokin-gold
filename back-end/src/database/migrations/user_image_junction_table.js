const userImageJunctionTable = `
CREATE TABLE IF NOT EXISTS user_image(
    user_id UUID REFERENCES users(user_id),
    image_id UUID REFERENCES images(image_id)
);
`;

module.exports = userImageJunctionTable;
