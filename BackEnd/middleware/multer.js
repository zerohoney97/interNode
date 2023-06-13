const multer = require("multer");
const path=require('path')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "imgs/"); // Set the destination folder where the uploaded files will be stored
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);

    const filename =
      path.basename(file.originalname, ext) + "_" + Date.now() + ext;
    cb(null, filename); // Use the original filename for the stored file
  },
  limits: { fileSize: 5 * 1024 * 1024 }, //5MB
});

const upload = multer({ storage });

module.exports = upload;
