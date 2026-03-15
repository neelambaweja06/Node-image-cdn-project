// const express = require("express");
// const router = express.Router();

// const upload = require("../middleware/upload");
// const uploadController = require("../controllers/uploadController");

// router.post("/upload", upload.single("image"), uploadController.uploadImage);

// module.exports = router;





const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const imageController = require("../controllers/uploadController");

// bulk upload
router.post("/bulk-upload", upload.array("images", 20), imageController.bulkUpload);

module.exports = router;