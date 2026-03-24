const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// REGISTER
const register = async (req, res) => {
  try {
    const { first_name, last_name, email, mobile_number, password } = req.body;

    const user_name = first_name + " " + (last_name || "");

    const hash = await bcrypt.hash(password, 10);

    const role_id = 2; // default user

    const userId = await User.createUser(
      first_name,
      last_name,
      user_name,
      email,
      mobile_number,
      hash,
      role_id
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: userId,
        name: user_name,
        email,
        mobile_number,
        role: "user"
      }
    });

  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        success: false,
        message: "Email already exists"
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await User.findUser(email);

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const user = result[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role_id: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user.id,
          name: user.user_name,
          email: user.email,
          role_id: user.role_id
        },
        token
      }
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

module.exports = { register, login };