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
  upload.array("files", 15)(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const files = req.files;
    const errors = [];

    if (files && files.length > 0) {
      for (const file of files) {
        const allowedTypes = ["image/jpeg", "image/png", "image/svg+xml"];

        if (!allowedTypes.includes(file.mimetype)) {
          errors.push(`Invalid file type: ${file.originalname}`);
          fs.unlinkSync(file.path); // Delete the invalid file
        }
      }

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }
    }

    next();
  });
};

module.exports = uploadMiddleware;
