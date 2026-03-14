require("dotenv").config();
const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {

    const ext = file.mimetype.split("/")[1]; 
    const uniqueName = Date.now() + "." + ext;

    cb(null, uniqueName);
  }

});

const upload = multer({ storage });

app.use("/uploads", express.static("uploads"));

app.post("/upload", upload.single("image"), (req, res) => {

  const imageUrl = `${process.env.BASE_URL}/uploads/${req.file.filename}`;

  res.json({
    message: "Image uploaded successfully",
    url: imageUrl
  });

});

app.listen(4000, () => {
  console.log("CDN server running on port 4000");
});