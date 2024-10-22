const multer = require("multer");
const fs = require("fs");
const uploadDir = "public/images";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Đặt tên file
  },
});

function fileToFileName(files) {
    if(Array.isArray(files)) {
        return files.map(file => `/public/${file.filename}`);
    }
    return [`/upload/${files.filename}`];
}

const upload = multer({ storage: storage })

module.exports = {upload, fileToFileName};
