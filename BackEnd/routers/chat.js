const router = require("express").Router();
const { ChatLog, User } = require("../models");
const path = require("path");
const { isLoginMiddle } = require("../middleware/isLoginMiddle");
const {
  getChatLogClient,
  getChatLogAdmin,
  saveChatDataAdmin,
  getAllChats,
} = require("../controllers/chatControlloer");
// /chat/create
router.post("/create", isLoginMiddle, async (req, res) => {
  const { chat } = req.body;
  const { acc_decoded } = req;
  const { primaryKey } = req.acc_decoded;
  // { data: { user_id : isLoginMiddleUserId, message,receiver,isRead } }
  //    const user_id = req.body.data.user_id;
  //    const message = req.body.data.message;
  //    const isRead = req.body.data.isRead;
  //    const receiver = req.body.data.receiver;

  // console.log(" 유저  ", user_id);
  // console.log("채팅 내용", message);
  await ChatLog.create({
    content: chat,
    user_id: primaryKey,
    isRead: false,
    receiver: primaryKey,
  });
  res.json(acc_decoded);
});

router.get("/Users", isLoginMiddle, async (req, res) => {
  const user = await User.findAll({});
  res.json(user);
});

// 고객센터 들어가기
router.get("/", isLoginMiddle, (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "FrontEnd", "popup", "index.html")
  );
});
// 마이페이지에서 채팅 기록 가져오기
router.get("/getChatLogClient", isLoginMiddle, getChatLogClient);
// 어드민페이지에서 채팅기록 가져오기
router.get("/getChatLogAdmin", isLoginMiddle, getChatLogAdmin);
// 어드민 페이지에서 채팅기록 보내기
router.post("/createAdminChat", isLoginMiddle, saveChatDataAdmin);
// 모든채팅 기록 가져오기
router.get("/getAllChats", isLoginMiddle, getAllChats);

module.exports = router;
