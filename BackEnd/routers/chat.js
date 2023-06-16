const router = require("express").Router();
const { ChatLog, User } = require("../models");
const path = require("path");
// /chat/create
router.post("/create",async(req,res)=>{
   const{user_id,message,isRead,receiver}=req.body.data 
 // { data: { user_id : isloginUserId, message,receiver,isRead } }
//    const user_id = req.body.data.user_id;
//    const message = req.body.data.message;
//    const isRead = req.body.data.isRead;
//    const receiver = req.body.data.receiver;

    console.log(" 유저  ",user_id)
    console.log("채팅 내용",message)
    await ChatLog.create({content:message,user_id,isRead,receiver});
    res.send("채팅 완료~")
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
