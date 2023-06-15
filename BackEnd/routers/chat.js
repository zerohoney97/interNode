const router = require("express").Router();
const { ChatLog, User } = require("../models");
const path = require("path");
// /chat/create
router.post("/create", async (req, res) => {
  const { user_id, message } = req.body.data;
  console.log(" 유저  ", user_id);
  console.log("채팅 내용", message);
  await ChatLog.create({ content: message, user_id });
  res.send("채팅 완료~");
});

router.get("/Users", async (req, res) => {
  const user = await User.findAll({});
  res.json(user);
});

// 고객센터 들어가기
router.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "FrontEnd", "popup", "index.html")
  );
});

module.exports = router;
