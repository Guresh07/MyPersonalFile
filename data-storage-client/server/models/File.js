const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  originalName: {
    type: String,
    required: true,
  },
  serverFilename: {
    type: String, // Cloudinary URL
    required: true,
  },
  fileUrl: {
    type: String, // Same as serverFilename
    required: true,
  },
  publicId: {
    type: String, // Cloudinary public ID for deletion
    required: true,
  },
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  uploadTime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("File", fileSchema);
