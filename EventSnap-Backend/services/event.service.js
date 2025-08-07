const cloudinary = require("../config/cloudinary");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const uploadToCloudinary = async (filePath) => {
  const result = await cloudinary.uploader.upload(filePath);
  fs.unlinkSync(filePath); // Clean up
  return result.secure_url;
};

const downloadImage = async (url, filename) => {
  const response = await axios({ url, responseType: "stream" });
  const filePath = path.join(__dirname, "..", "uploads", filename);

  return new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);
    writer.on("finish", () => resolve(filePath));
    writer.on("error", reject);
  });
};

const processImage = async (file, imageUrl) => {
  if (file) {
    return await uploadToCloudinary(file.path);
  }
  if (imageUrl?.startsWith("http")) {
    const filePath = await downloadImage(imageUrl, `temp-${Date.now()}.jpg`);
    return await uploadToCloudinary(filePath);
  }
  return null;
};

module.exports = { processImage };
