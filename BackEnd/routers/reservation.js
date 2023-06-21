const router = require("express").Router();
const path = require("path");
const {
  getUserId,
  checkReservedList,
} = require("../controllers/reservationController");

router.get("/seats", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "FrontEnd", "seat", "seat.html")
  );
});

// 유저 아이디 반환
router.get("/user", getUserId);

// 유저 예매 완료 되었는지 반환
router.post("/check", checkReservedList);

// 결제페이지
router.get("/pay", (req, res) => {
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
module.exports = router;
