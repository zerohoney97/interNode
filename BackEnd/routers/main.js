const router = require("express").Router();

router.get("/", (req, res) => {
  res.sendFile("/home/ubuntu/FrontEnd/mainpage/mainpage.html");
});

module.exports=router