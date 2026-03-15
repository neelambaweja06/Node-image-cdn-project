// const axios = require("axios");
// const fs = require("fs");
// const FormData = require("form-data");
// const Image = require("../models/imageModel");

// exports.uploadImage = async (req, res) => {

//   try {

//     if (!req.file) {
//       return res.status(400).json({
//         message: "No image file provided"
//       });
//     }

//     const form = new FormData();

//     form.append("image", fs.createReadStream(req.file.path));
//     form.append("project_name", "main-project");

//     const response = await axios.post(
//       "http://localhost:4000/upload",
//       form,
//       { headers: form.getHeaders() }
//     );

//     const imageUrl = response.data.url;

//     await Image.saveImage(imageUrl);

//     return res.status(201).json({
//       message: "Image uploaded successfully",
//       url: imageUrl
//     });

//   } catch (error) {

//     console.error(error);

//     return res.status(500).json({
//       message: "Image upload failed",
//       error: error.message
//     });

//   }

// };





exports.bulkUpload = async (req, res) => {
  try {

    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({
        message: "No images uploaded"
      });
    }

    const imageUrls = files.map(file => {
      return `http://localhost:3000/uploads/${file.filename}`;
    });

    res.status(200).json({
      message: "Images uploaded successfully",
      images: imageUrls
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }
};