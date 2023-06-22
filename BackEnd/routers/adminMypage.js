const router = require("express").Router();
const path = require("path");
const {
  enrollShow,
  getShow,
  updateShow,
  getAllUsers,
  getAllReportedUsers,
  applySanction,
  noptApplySanction,
  deleteShow
} = require("../controllers/adminPageController");
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

//

// 어드민 페이지=> 유저 검색
router.get("/userSearch", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "..",
      "..",
      "FrontEnd",
      "zerohoneyHTML",
      "adminPage",
      "userSearch.html"
    )
  );
});

// 유저 검색 사이트에서 유저 리스트 가져오기
router.get("/getUser", getAllUsers);

// 어드민 페이지=>유저 신고 리스트
router.get("/userReport", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "..",
      "..",
      "FrontEnd",
      "zerohoneyHTML",
      "adminPage",
      "userReport.html"
    )
  );
});

// 신고된 유저 가져오기
router.get("/getReportedUser", getAllReportedUsers);

// 신고된 유저 제제
router.post("/updateUserReport", applySanction);
// 신고된 유저 반려
router.post("/notUpdateUserReport", noptApplySanction);
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

// 공연 삭제
router.get("/delete/:id", deleteShow);

module.exports = router;
