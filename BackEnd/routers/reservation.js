const router = require("express").Router();
const path = require("path");
const {
  getUserId,
  checkReservedList,
  getPayInfo,
} = require("../controllers/reservationController");
const { isLoginMiddle } = require("../middleware/isLoginMiddle");
router.get("/seats",isLoginMiddle, (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "FrontEnd", "seat", "seat.html")
  );
});

// 유저 아이디 반환
router.get("/user", isLoginMiddle,getUserId);

// 유저 예매 완료 되었는지 반환
router.post("/check",isLoginMiddle, checkReservedList);

// 결제페이지
router.get("/pay/?", isLoginMiddle,(req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "FrontEnd", "testPay.html"));
});

// 결제 성공
router.get("/successPay", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "..",
      "..",
      "FrontEnd",
      "testPaySuccess.html"
      //   "zerohoneyHTML",
      //   "generalMyPage",
      //   "reservedList.html"
    )
  );
});

// 결제 요청을 받아주는 함수
router.post("/getPayInfo", getPayInfo);
module.exports = router;
