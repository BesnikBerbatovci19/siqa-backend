const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/product");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadMiddleware = (req, res, next) => {
  console.log(req);
  upload.fields([{ name: "files", maxCount: 15 }])(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const files = req.files?.files || [];

    if (files.length === 0) {
      return res.status(400).json({
        error: "No files uploaded. Please upload at least one photo.",
      });
    }

    const errors = [];
    const allowedTypes = ["image/jpeg", "image/png", "image/svg+xml"];

    for (const file of files) {
      if (!allowedTypes.includes(file.mimetype)) {
        errors.push(`Invalid file type: ${file.originalname}`);
      }
    }

    if (errors.length > 0) {
      // Delete uploaded invalid files
      files.forEach((file) => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });

      return res.status(400).json({ errors });
    }

    // Proceed to the next middleware
    next();
  });
};

module.exports = uploadMiddleware;
