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
      cb(null, `uploads/product/main/${Date.now()}-${file.originalname}`);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
});

const uploadMiddleware = (req, res, next) => {
  upload.array("files", 15)(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/svg+xml"];
    const files = req.files;
    const errors = [];
    const uploadedFiles = [];

    for (const file of files) {
      if (!allowedTypes.includes(file.mimetype)) {
        errors.push(`Invalid file type: ${file.originalname}`);
        continue;
      }

      uploadedFiles.push({
        originalName: file.originalname,
        fileName: file.key,
        url: file.location,
      });
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    req.uploadedFiles = uploadedFiles;
    next();
  });
};

module.exports = uploadMiddleware;
