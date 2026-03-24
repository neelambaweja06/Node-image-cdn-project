const db = require("../config/db");

async function up() {

  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,

      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100),

      user_name VARCHAR(100) UNIQUE,

      email VARCHAR(150) UNIQUE NOT NULL,
      mobile_number VARCHAR(15),

      password VARCHAR(255) NOT NULL,

      role_id INT DEFAULT 2,

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
      ON UPDATE CURRENT_TIMESTAMP,

      FOREIGN KEY (role_id) REFERENCES roles(id)

    );
  `;

  await db.query(query);

  console.log("✅ Users table created successfully");
}

module.exports = { up };