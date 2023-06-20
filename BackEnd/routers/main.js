const router = require("express").Router();
const path = require("path");
const { isLogin } = require("../middleware/islogin");

router.get("/", isLogin, (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "FrontEnd", "mainpage", "mainpage.html")
  );
});

router.get("/seats/:id", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "FrontEnd", "seat", "seat.html")
  );
});

module.exports = router;
