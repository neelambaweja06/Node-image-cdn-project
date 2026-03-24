const db = require("../config/db");

module.exports.up = async () => {
  try {
    await db.execute(`
      CREATE TABLE roles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        role_name VARCHAR(50) NOT NULL UNIQUE
      )
    `);

    // default roles
    await db.execute(`
      INSERT INTO roles (role_name) VALUES 
      ('admin'),
      ('user')
    `);

    console.log("✅ Roles table created");
  } catch (error) {
    console.error(error);
  }
};