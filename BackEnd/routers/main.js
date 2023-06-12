const router = require("express").Router();

router.get("/", (req, res) => {
  res.sendFile("../../FrontEnd/mainpage/mainpage.html");
});
