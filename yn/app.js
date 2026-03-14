const express = require("express");

const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/images", uploadRoutes);

module.exports = app;