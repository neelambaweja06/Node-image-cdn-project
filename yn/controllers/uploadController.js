const axios = require("axios");
const FormData = require("form-data");

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
      formData.append("images", file.buffer, file.originalname);
    });

    const response = await axios.post(
      "http://localhost:4000/uploads",
      formData,
      { headers: formData.getHeaders() }
    );

    res.json({
      message: "Images uploaded to CDN",
      images: response.data.images
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Upload failed"
    });

  }

};




