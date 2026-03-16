const axios = require("axios");
const FormData = require("form-data");
const imageModel = require("../models/imageModel");
const db = require("../config/db");

exports.uploadImages = async (req, res) => {

  try {

    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({
        message: "No images uploaded"
      });
    }

    const formData = new FormData();

    files.forEach(file => {

      formData.append(
        "images",
        file.buffer,
        file.originalname
      );

    });

    const response = await axios.post(
      "http://localhost:4000/uploads",
      formData,
      {
        headers: formData.getHeaders()
      }
    );

    const imageUrls = response.data.images;

    for (const url of imageUrls) {
      await imageModel.saveImage(url);
    }

    res.json({
      message: "Images uploaded successfully",
      images: imageUrls
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Upload failed"
    });

  }

};

exports.deleteImage = async (req, res) => {

  try {

    const id = req.params.id;

    const [rows] = await db.query(
      "SELECT image_url FROM images WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Image not found"
      });
    }

    const imageUrl = rows[0].image_url;

    await axios.delete(
      "http://localhost:4000/delete",
      {
        data: { url: imageUrl }
      }
    );

    await imageModel.deleteImage(id);

    res.json({
      message: "Image deleted successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Delete failed"
    });

  }

};