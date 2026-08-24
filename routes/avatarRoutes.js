const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const cloudinary = require("../config/cloudinary");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /api/avatar:
 *   post:
 *     summary: Upload a user avatar
 *     tags: [Avatar]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - avatar
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: Image file for the user's avatar
 *     responses:
 *       201:
 *         description: Avatar uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Avatar uploaded successfully
 *                 avatarUrl:
 *                   type: string
 *                   example: https://res.cloudinary.com/example/image/upload/avatar.png
 *       400:
 *         description: No image uploaded
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Cloudinary upload failed
 */
router.post("/", protect, upload.single("avatar"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "mern-auth-avatars",
        resource_type: "image",
      },
      async (error, result) => {
        if (error) {
          return res.status(500).json({
            message: "Cloudinary upload failed",
            error: error.message,
          });
        }

        res.status(201).json({
          message: "Avatar uploaded successfully",
          avatarUrl: result.secure_url,
        });
      }
    );

    uploadStream.end(req.file.buffer);
  } catch (error) {
    res.status(500).json({
      message: "Failed to upload avatar",
      error: error.message,
    });
  }
});

module.exports = router;