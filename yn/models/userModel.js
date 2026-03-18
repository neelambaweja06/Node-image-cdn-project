const db = require("../config/db");

// exports.createUser = async (name, email, password) => {

//     const sql = "INSERT INTO users(name,email,password) VALUES(?,?,?)";

//     const [result] = await db.query(sql, [name, email, password]);

//     return result;
// };
exports.createUser = async (
  first_name,
  last_name,
  user_name,
  email,
  mobile_number,
  password
) => {
  const sql = `
    INSERT INTO users 
    (first_name, last_name, user_name, email, mobile_number, password) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const [result] = await db.query(sql, [
    first_name,
    last_name,
    user_name,
    email,
    mobile_number,
    password,
  ]);

  return result;
};


exports.findUser = async (email) => {

    const sql = "SELECT * FROM users WHERE email=?";

    const [rows] = await db.query(sql, [email]);

    return rows;
};

