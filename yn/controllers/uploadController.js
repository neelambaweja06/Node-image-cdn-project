const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const Image = require("../models/imageModel");

exports.uploadImage = async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        message: "No image file provided"
      });
    }

    const form = new FormData();

    form.append("image", fs.createReadStream(req.file.path));
    form.append("project_name", "main-project");

    const response = await axios.post(
      "http://localhost:4000/upload",
      form,
      { headers: form.getHeaders() }
    );

    const imageUrl = response.data.url;

    await Image.saveImage(imageUrl);

    return res.status(201).json({
      message: "Image uploaded successfully",
      url: imageUrl
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Image upload failed",
      error: error.message
    });

  }

};


// const db = require("../config/db");

// exports.uploadPhotos = async (req, res) => {

//   try {

//     const files = req.files;

//     for (let file of files) {

//       const imageUrl = "https://cdn.yoursite.com/uploads/" + file.filename;

//       await db.query(
//         "INSERT INTO photos(image_url) VALUES(?)",
//         [imageUrl]
//       );

//     }

//     res.json({
//       message: "Photos uploaded successfully"
//     });

//   } catch (error) {

//     res.status(500).json({
//       message: error.message
//     });

//   }

// };