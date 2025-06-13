const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const File = require("../models/File");
const jwt = require("jsonwebtoken");
// ✅ Directly hardcoded secret here
const JWT_SECRET = "myCustomSecret123";

// Cloudinary setup
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");



// Cloudinary storage config
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "data-storage-app",
    resource_type: "raw",
  },
});
const upload = multer({ storage });

/**
 * Utility to extract publicId from a Cloudinary URL
 */
function extractPublicIdFromUrl(url) {
  const parts = url.split("/");
  const publicIdWithExtension = parts[parts.length - 1];
  return publicIdWithExtension.substring(0, publicIdWithExtension.lastIndexOf(".")); // remove file extension
}

/**
 * Upload Route
 */
router.post("/upload", verifyToken, upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  try {
    const newFile = new File({
      originalName: req.file.originalname || req.file.filename,
      serverFilename: req.file.path, // Cloudinary URL
      fileUrl: req.file.path,
      publicId: req.file.filename || req.file.public_id || extractPublicIdFromUrl(req.file.path),
      uploader: req.user.id,
    });

    await newFile.save();

    res.status(200).json({
      message: "File uploaded successfully",
      fileUrl: req.file.path,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save file metadata" });
  }
});

/**
 * List Files
 */
router.get("/list", verifyToken, async (req, res) => {
  try {
    const files = await File.find({ uploader: req.user.id }).sort({ uploadTime: -1 });
    res.status(200).json({ files });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch files." });
  }
});

/**
 * Delete File
 */
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });

    // Delete from Cloudinary using publicId
    const destroyResult = await cloudinary.uploader.destroy(file.publicId, { resource_type: "raw" });
  console.log("Cloudinary delete result:", destroyResult);
  await file.deleteOne();

  res.status(200).json({ message: 'File deleted successfully' });
    // Remove from DB
    await File.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "File deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete file" });
  }
});

/**
 * Download Proxy
 */
const axiosLib = require("axios");

router.get("/download/:id", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.query.token;
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, "myCustomSecret123");
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });

    if (file.uploader.toString() !== decoded.id)
      return res.status(403).json({ message: "Unauthorized download access" });

    // console.log("Downloading from:", file.serverFilename);
    // console.log("Decoded token:", decoded);
    // console.log('File from DB:', file);
    // console.log('Downloading from URL:', file.fileUrl);


    // Fetch file as stream from Cloudinary
    const fileResponse = await axiosLib({
      method: "GET",
      url: file.serverFilename,
      responseType: "stream",
    });

    res.setHeader("Content-Disposition", `attachment; filename="${file.originalName}"`);
    fileResponse.data.pipe(res);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to download file" });
  }
});


module.exports = router;
