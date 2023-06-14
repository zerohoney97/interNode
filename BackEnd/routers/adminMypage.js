const router = require("express").Router();
const path = require("path");
const { enrollShow, getShow } = require("../controllers/showController");
const upload = require("../middleware/multer");

// 공연등록
router.post("/enroll", upload.single("showImg"), enrollShow);

// 공연 가져오기
router.get("/getShow", getShow);

module.exports = router;
