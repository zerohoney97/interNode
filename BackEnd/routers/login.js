const router = require("express").Router();
const { login, viewUser } = require("../controllers/loginController");
const { isLogin } = require("../middleware/islogin");
const path = require("path");

router.post("/", login);

router.get("/view", isLogin, viewUser);

// 로그인 페이지
router.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "FrontEnd", "login", "login.html")
  );
});

//

module.exports = router;
