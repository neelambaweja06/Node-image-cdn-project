const db = require("../config/db");

async function up() {

  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
      ON UPDATE CURRENT_TIMESTAMP
    );
  `;

  await db.query(query);

  console.log("✅ Users table created successfully");
}

module.exports = { up };