const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const imageController = require("../controllers/uploadController");

// bulk upload
router.post("/uploads", upload.array("images",20), imageController.uploadImages);

module.exports = router;


