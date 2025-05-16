const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
require("dotenv").config();

const s3 = new S3Client({
  region: process.env.SPACES_REGION,
  endpoint: process.env.SPACES_ENDPOINT,
  credentials: {
    accessKeyId: process.env.SPACES_ACCESS_KEY,
    secretAccessKey: process.env.SPACES_SECRET_KEY,
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.SPACES_BUCKET,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      cb(null, `uploads/banner/${Date.now()}-${file.originalname}`);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
});

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

    const uploadedFiles = {};
    const errors = [];

    for (const key of ["photo_md", "photo_sm"]) {
      if (files[key] && files[key][0]) {
        const file = files[key][0];
        if (!allowedTypes.includes(file.mimetype)) {
          errors.push(`Invalid file type: ${file.originalname}`);
        } else {
          uploadedFiles[key] = {
            originalName: file.originalname,
            fileName: file.key,
            url: file.location,
          };
        }
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    req.uploadedFiles = uploadedFiles;
    next();
  });
};

module.exports = uploadMiddlewareBanner;
