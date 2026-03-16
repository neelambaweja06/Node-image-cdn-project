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

    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + ext;

    cb(null, uniqueName);
  }

});

const upload = multer({ storage });

app.use("/uploads", express.static("uploads"));

app.post("/uploads", upload.array("images",20),(req,res)=>{

 const imageUrls = req.files.map(file=>{
   return `${process.env.BASE_URL}/uploads/${file.filename}`
 })

 res.json({
   images:imageUrls
 })

})

app.listen(4000, () => {
  console.log("CDN server running on port 4000");
});

