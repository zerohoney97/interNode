const router = require("express").Router();
const path = require("path");
const {
  enrollShow,
  getShow,
  updateShow,
} = require("../controllers/showController");
const upload = require("../middleware/multer");

// 어드민페이지 메인
router.get("/", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "..",
      "..",
      "FrontEnd",
      "zerohoneyHTML",
      "adminPage",
      "showControll.html"
    )
  );
});

// 공연등록
router.post("/enroll", upload.single("showImg"), enrollShow);

// 공연 가져오기
router.get("/getShow", getShow);

// 공연 수정 페이지
router.get("/update/:id", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "..",
      "..",
      "FrontEnd",
      "zerohoneyHTML",
      "adminPage",
      "showUpdate.html"
    )
  );
});

// 공연 수정
router.post("/update/:id", upload.single("showImg"), updateShow);

module.exports = router;
