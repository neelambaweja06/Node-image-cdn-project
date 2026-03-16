const db = require("../config/db");

exports.saveImage = async (imageUrl) => {

  const sql = "INSERT INTO images (image_url) VALUES (?)";

  const [result] = await db.query(sql, [imageUrl]);

  return result;

};

exports.deleteImage = async (id) => {

  const sql = "DELETE FROM images WHERE id = ?";

  const [result] = await db.query(sql, [id]);

  return result;

};