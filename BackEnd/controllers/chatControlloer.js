const Sequelize = require("sequelize");
const { ChatLog } = require("../models");
const socketIO = require("socket.io");
// 선택된 유저 (채팅방의 id)
let userId = 0;
// 현재 로그인한 유저
let nowLoginUserId = 0;
exports.getChatLogClient = async (req, res) => {
  try {
    const { primaryKey } = req.acc_decoded;
    userId = primaryKey;
    console.log(userId, "adads");
    const chatDataArray = await ChatLog.findAll({
      where: { receiver: primaryKey },
      order: [["createdAt", "ASC"]],
    });
    res.send(chatDataArray);
  } catch (error) {
    console.log(error);
  }
};

exports.getChatLogAdmin = async (req, res) => {
  try {
    const { primaryKey } = req.acc_decoded;
    const { id } = req.query;
    console.log(id);
    userId = id;
    nowLoginUserId = primaryKey;
    const chatDataArray = await ChatLog.findAll({
      where: { receiver: id },
      order: [["createdAt", "ASC"]],
    });
    await ChatLog.update(
      {
        isRead: true,
      },
      { where: { receiver: id } }
    );
    console.log(id);
    res.send(chatDataArray);
  } catch (error) {
    console.log(error);
  }
};

exports.saveChatDataAdmin = async (req, res) => {
  // 상대방(클라이언트)의 아이디
  const { chat, id } = req.body;
  // 유저 아이디는 admin 자신으로 해야한다.
  const { primaryKey } = req.acc_decoded;
  // { data: { user_id : isloginUserId, message,receiver,isRead } }
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
    receiver: id,
  });

  await ChatLog.update(
    {
      isRead: true,
    },
    { where: { receiver: id } }
  );
  res.send("저장 성공");
};

// 어드민 채팅방 입장시 socket작업
exports.chattingSocket = (socket, io) => {
  try {
    // 어드민은 채팅방 클릭시,클라이언트는 고객센터 들어갈시 방에 들어감
    socket.on("joinRoom", () => {
      console.log(userId, "조인룸");
      socket.join(parseInt(userId));
      console.log("Server received joinRoom event");
      io.to(userId).emit("joinRoom", userId);
      // Handle the joinRoom event logic here
    });

    // 어드민의 메시지
    socket.on("chat3", (content, userId) => {
      console.log("유저 메세지 전송", content, userId);
      io.to(parseInt(userId)).emit("chat", content, nowLoginUserId);
      // Handle the joinRoom event logic here
    });
    // 유저의 메시지
    socket.on("chat2", (content,userKey) => {
      console.log("유저 메세지 전송 어드민에게", content, userKey);
      io.to(parseInt(userKey)).emit("chat", content, userKey);
      // Handle the joinRoom event logic here
    });
  } catch (error) {
    console.log(error);
  }
};

// 모든 채팅 기록을 가져옴
exports.getAllChats = async (req, res) => {
  try {
    const data = await ChatLog.findAll();
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};
