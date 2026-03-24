const db = require("../config/db");


exports.createUser = async (
  first_name,
  last_name,
  user_name,
  email,
  mobile_number,
  password,
  role_id // 👈 added
) => {
  const sql = `
    INSERT INTO users 
    (first_name, last_name, user_name, email, mobile_number, password,role_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const [result] = await db.query(sql, [
    first_name,
    last_name,
    user_name,
    email,
    mobile_number,
    password,
    role_id, // 👈 added
  ]);

  return result;
};


exports.findUser = async (email) => {

    const sql = "SELECT * FROM users WHERE email=?";

    const [rows] = await db.query(sql, [email]);

    return rows;
};

