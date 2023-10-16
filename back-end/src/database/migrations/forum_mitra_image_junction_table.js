const createForumMitraImageTableJunction = `
    CREATE TABLE IF NOT EXISTS forum_mitras_image (
    forum_id UUID REFERENCES forum_mitras(forum_mitra_id),
    image_id UUID REFERENCES images(image_id)
  );
`

module.exports = createForumMitraImageTableJunction;