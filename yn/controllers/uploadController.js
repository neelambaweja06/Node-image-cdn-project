const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const Image = require("../models/imageModel");

exports.uploadImages = async (req, res) => {

  try {

    const files = req.files || (req.file ? [req.file] : []);

    if (!files.length) {
      return res.status(400).json({
        message: "No images uploaded"
      });
    }

    const formData = new FormData();

    files.forEach(file => {
      formData.append("images", fs.createReadStream(file.path));
    });

    // CDN server call
    const response = await axios.post(
      "http://localhost:4000/uploads",
      formData,
      { headers: formData.getHeaders() }
    );

    const imageUrls = response.data.images || [response.data.url];

    // Save URLs in database
    for (let url of imageUrls) {
      await Image.saveImage(url);
    }

    res.status(200).json({
      message: "Images uploaded successfully",
      images: imageUrls
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Upload failed",
      error: error.message
    });

  }

};