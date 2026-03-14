const bcrypt = require("bcrypt");
const User = require("../models/userModel");

exports.register = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const hash = await bcrypt.hash(password, 10);

        await User.createUser(name, email, hash);

        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (err) {

        if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
};



exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const result = await User.findUser(email);

        if (result.length === 0) {
            return res.json({
                message: "User not found"
            });
        }

        const user = result[0];

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.json({
                message: "Wrong password"
            });
        }

        res.json({
            message: "Login successful"
        });

    } catch (err) {

        res.status(500).json({
            message: "Server error",
            error: err.message
        });

    }
};