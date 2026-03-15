// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({

//   destination: function (req, file, cb) {
//     cb(null, "temp/");
//   },

//   filename: function (req, file, cb) {

//     const ext = path.extname(file.originalname);
//     const uniqueName = Date.now() + ext;

//     cb(null, uniqueName);
//   }

// });

// const upload = multer({ storage });

// module.exports = upload;





const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;