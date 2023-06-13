const router = require("express").Router();
const path = require("path");
const { enrollShow } = require("../controllers/showController");
const upload = require("../middleware/multer");

router.post("/enroll", upload.single("showImg"), enrollShow);

module.exports = router;
