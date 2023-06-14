const router = require("express").Router();
const { getUserInfo, changeNickName, changePassword, changeImg, getUserReservedList, insertReviewBoard, editReviewBoard, deleteReviewBoard } = require("../controllers/mypageController");
const upload = require("../middleware/multer");

// 유저 정보 반환
router.get("/getUser", getUserInfo);

// 닉네임 변경
router.post("/changeNickName", changeNickName);

// 비밀번호 변경
router.post("/changePassword", changePassword);

// 프로필 이미지 변경
router.post("/changeImg", upload.single("img"), changeImg);

// 예매 내역 확인
router.get("/getReservedList", getUserReservedList);

// 후기 등록
router.post("/insertReviewBoard/:show_id", insertReviewBoard);

// 후기 수정
router.post("/editReviewBoard/:id", editReviewBoard);

// 후기 삭제
router.get("/deleteReviewBoard/:id", deleteReviewBoard);

module.exports = router;