const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/banner";

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadMiddlewareBanner = (req, res, next) => {
  upload.fields([
    { name: "photo_md", maxCount: 1 },
    { name: "photo_sm", maxCount: 1 },
  ])(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/svg+xml",
      "image/gif",
      "video/mp4",
    ];

    const files = req.files;

    if (!files || (!files.photo_md && !files.photo_sm)) {
      return res.status(400).json({ error: "Please upload both banners" });
    }

    for (const key of ["photo_md", "photo_sm"]) {
      if (files[key] && files[key][0]) {
        const file = files[key][0];

        if (!allowedTypes.includes(file.mimetype)) {
          fs.unlinkSync(file.path);
          return res
            .status(400)
            .json({ error: `Invalid file type: ${file.originalname}` });
        }
      }
    }

    next();
  });
};

module.exports = uploadMiddlewareBanner;
