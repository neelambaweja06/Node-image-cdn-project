// const express = require("express");
// const router = express.Router();

// const upload = require("../middleware/upload");
// const uploadController = require("../controllers/uploadController");

// router.post("/upload", upload.single("image"), uploadController.uploadImage);

// module.exports = router;



const upload = require("../middleware/upload");

router.post(
  "/upload-photos",
  upload.array("photos", 20), // upload max 20 photos
  controller.uploadPhotos
);