const router = require("express").Router();
// const { checkEmail, sendEmail, checkCode, signUp } = require("../controllers/signUpController");
const { checkEmail, signUp } = require("../controllers/signUpController");

const path = require("path");

// signUp 페이지

router.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "FrontEnd", "signUp", "signUp.html")
  );
});


// 이메일 중복 확인
router.post("/checkemail", checkEmail);

// // 이메일 인증 메일 보내기
// router.post("/sendemail", sendEmail);

// // 인증코드 체크
// router.post("/checkcode", checkCode);

// 회원가입(유저 추가)
router.post("/", signUp);

module.exports = router;