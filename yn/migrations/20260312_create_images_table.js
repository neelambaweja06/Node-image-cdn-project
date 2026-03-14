const db = require("../config/db");

async function up() {

  const query = `
    CREATE TABLE IF NOT EXISTS images (
      id INT AUTO_INCREMENT PRIMARY KEY,
      image_url VARCHAR(500) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await db.query(query);

  console.log("✅ Images table created successfully");
}

module.exports = { up };