const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/website");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadMiddlewareWebsite = (req, res, next) => {
  upload.single("logo")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const file = req.file;
    const errors = [];

    if (!file) {
      return res.status(400).json({ error: "Logo image is required." });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/svg+xml"];

    if (!allowedTypes.includes(file.mimetype)) {
      errors.push(`Invalid file type: ${file.originalname}`);
      fs.unlinkSync(file.path);
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    next();
  });
};

module.exports = uploadMiddlewareWebsite;
