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
      cb(null, `uploads/website/${Date.now()}-${file.originalname}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const uploadMiddlewareWebsite = (req, res, next) => {
  upload.single("logo")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "Logo image is required." });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/svg+xml"];

    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({
        errors: [`Invalid file type: ${file.originalname}`],
      });
    }

    req.uploadedFile = {
      originalName: file.originalname,
      fileName: file.key,
      url: file.location,
    };

    next();
  });
};

module.exports = uploadMiddlewareWebsite;
