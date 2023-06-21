const router = require("express").Router();
const { login, viewUser, logOut } = require("../controllers/loginController");
const { isLoginMiddle } = require("../middleware/isLoginMiddle");
const path = require("path");

router.post("/", login);

router.get("/view", isLoginMiddle, viewUser);

// 로그인 페이지
router.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "FrontEnd", "login", "login.html")
  );
});

// 로그인 실패 페이지(아이디 없음)
router.get("/idErr", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "FrontEnd", "login", "idErr.html")
  );
});

// 로그인 실패 페이지(비밀번호 틀림)
router.get("/pwErr", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "FrontEnd", "login", "pwErr.html")
  );
});

// 로그인 실패 페이지(이용 제한 유저)
router.get("/loginBlock", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "FrontEnd", "login", "loginBlock.html")
  );
});

// 액세스 토큰 만료 페이지
router.get("/expired", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "FrontEnd", "login", "loginExpired.html")
  );
});


//로그아웃
router.get("/logout", logOut);

module.exports = router;
