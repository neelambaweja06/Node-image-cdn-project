const express = require("express");

const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const userRoutes = require("./routes/userRoutes");


const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/images", uploadRoutes);

app.use("/api/user", userRoutes);

module.exports = app;