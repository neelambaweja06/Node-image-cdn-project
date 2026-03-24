const db = require("../config/db");

// CREATE USER
exports.createUser = async (
  first_name,
  last_name,
  user_name,
  email,
  mobile_number,
  password,
  role_id
) => {
  const sql = `
    INSERT INTO users 
    (first_name, last_name, user_name, email, mobile_number, password, role_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const [result] = await db.query(sql, [
    first_name,
    last_name,
    user_name,
    email,
    mobile_number,
    password,
    role_id,
  ]);

  return result.insertId; // ✅ FIX
};

// FIND USER
exports.findUser = async (email) => {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows;
};
// ✅ GET ALL USERS
exports.getAllUsers = async () => {
  const [rows] = await db.query("SELECT * FROM users");
  return rows;
};

exports.getUserById = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM users WHERE id = ?",
    [id]
  );

  return rows[0]; // 👈 MUST return single user
};


// UPDATE USER
exports.updateUser = async (id, first_name, last_name, mobile_number) => {
  const sql = `
    UPDATE users 
    SET first_name = ?, last_name = ?, mobile_number = ?
    WHERE id = ?
  `;

  await db.query(sql, [first_name, last_name, mobile_number, id]);
};

// DELETE USER
exports.deleteUser = async (id) => {
  await db.query("DELETE FROM users WHERE id = ?", [id]);
};