const bcrypt = require("bcrypt");
const User = require("../models/userModel");

// ✅ register
const register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      mobile_number,
      password,
    } = req.body;

    if (!first_name || !email || !password) {
      return res.json({ message: "Required fields missing" });
    }

    const user_name = (first_name + " " + (last_name || ""));

    const hash = await bcrypt.hash(password, 10);

    // 👇 default role_id = 2 (user)
    const role_id = 2;

    await User.createUser(
      first_name,
      last_name,
      user_name,
      email,
      mobile_number,
      hash,
      role_id // 👈 added
    );

    res.status(201).json({
      message: "User registered successfully",
      user_name,
      role : "user"
    });

  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        message: "Email or Username already exists",
      });
    }

    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

// ✅ login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await User.findUser(email);

    if (result.length === 0) {
      return res.json({ message: "User not found" });
    }

    const user = result[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.json({ message: "Wrong password" });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        role_id: user.role_id // 👈 IMPORTANT
      }
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
};

// ✅ export ALL
module.exports = {
  register,
  login
};