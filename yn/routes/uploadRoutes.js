const express = require("express");

const router = express.Router();

const upload = require("../middlewares/upload");

const controller = require("../controllers/uploadController");

router.post(
  "/upload",
  upload.array("images", 20),
  controller.uploadImages
);

router.delete(
  "/delete/:id",
  controller.deleteImage
);

module.exports = router;