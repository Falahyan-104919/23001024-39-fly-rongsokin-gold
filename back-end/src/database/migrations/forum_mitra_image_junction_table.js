const createForumMitraImageTableJunction = `
    CREATE TABLE IF NOT EXISTS forum_mitras_image (
    forum_id VARCHAR(50) REFERENCES forum_mitras(forum_mitra_id),
    image_id VARCHAR(50) REFERENCES images(image_id)
  );
`

module.exports = createForumMitraImageTableJunction;