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

//로그아웃
router.get("/logout", logOut);

module.exports = router;
