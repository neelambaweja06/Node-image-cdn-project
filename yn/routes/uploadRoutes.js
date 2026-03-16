


const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload");
const controller = require("../controllers/uploadController");

router.post("/upload", upload.array("images"), controller.uploadImages);

module.exports = router;


