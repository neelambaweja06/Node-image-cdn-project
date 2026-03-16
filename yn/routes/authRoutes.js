const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const validateAuth = require("../middlewares/validateAuth");

router.post("/register",
    validateAuth.validateRegister,
    authController.register
);

router.post("/login",
    validateAuth.validateLogin,
    authController.login
);

module.exports = router;