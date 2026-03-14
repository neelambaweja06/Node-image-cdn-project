const db = require("../config/db");

exports.createUser = async (name, email, password) => {

    const sql = "INSERT INTO users(name,email,password) VALUES(?,?,?)";

    const [result] = await db.query(sql, [name, email, password]);

    return result;
};

exports.findUser = async (email) => {

    const sql = "SELECT * FROM users WHERE email=?";

    const [rows] = await db.query(sql, [email]);

    return rows;
};