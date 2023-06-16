const router = require("express").Router();
const {ChatLog, User} = require("../models")

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

router.get("/Users",async(req,res)=>{
    const user = await User.findAll({});
    res.json(user) 
})



module.exports = router;