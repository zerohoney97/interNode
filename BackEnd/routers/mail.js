const router = require("express").Router();
const { sendEmail, checkCode } = require("../controllers/mailController");
const path = require("path");

// 이메일 인증 메일 보내기
router.post("/sendemail", sendEmail);

// 인증코드 체크
router.post("/checkcode", checkCode);

module.exports = router;