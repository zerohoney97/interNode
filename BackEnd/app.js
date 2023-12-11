const e = require("express");
const { sequelize, ReservedList } = require("./models");
const dot = require("dotenv").config();
const cors = require("cors");
const session = require("express-session");
const path = require("path");
const app = e();
const signUpRouter = require("./routers/signUp");
const mainRouter = require("./routers/main");
const chatRouter = require("./routers/chat");
const showDetailRouter = require("./routers/showdetail");
const loginRouter = require("./routers/login");
const freeBoardsRouter = require("./routers/freeBoard");
const reservationRouter = require("./routers/reservation");
const mypageRouter = require("./routers/mypage");
const mailRouter = require("./routers/mail");
const dummyRouter = require("./routers/addDummy");
const { isLoginMiddle } = require("./middleware/isLoginMiddle");
const adminPageRouter = require("./routers/adminMypage");
const chartRouter = require("./routers/chart");
const socketIO = require("socket.io");
const {
  initReservationSocket,
} = require("./controllers/reservationController");
const { chattingSocket } = require("./controllers/chatControlloer");

app.use(e.json());
app.use(e.urlencoded({ extended: false }));

app.use(
  cors({
    origin: [
      "http://127.0.0.1:5500",
      "http://127.0.0.1:8080",
      "http://localhost:8080",
      "http://ec2-52-79-43-68.ap-northeast-2.compute.amazonaws.com",
      "http://15.164.187.63",
      "http://zerohoney.com",
    ],
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("연결 성공~");
  })
  .catch((err) => {
    console.log(err);
  });

// 세션 사용
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(
  "*/public",
  e.static(path.join(__dirname, "..", "FrontEnd", "public"), {
    setHeaders: (res, filePath) => {
      if (path.extname(filePath) === ".css") {
        res.setHeader("Content-Type", "text/css");
      }
    },
  })
);

app.use(
  "*/js",
  e.static(path.join(__dirname, "..", "FrontEnd", "js"), {
    setHeaders: (res, filePath) => {
      if (path.extname(filePath) === ".js") {
        res.setHeader("Content-Type", "text/javascript");
      }
    },
  })
);

app.use(
  "/FrontEnd/zerohoneyPublic/resources",
  e.static(
    path.join(__dirname, "..", "FrontEnd", "zerohoneyPublic", "resources")
  )
);

// bj
// app.use("/user_img",express.static(path.join(__dirname,"user_img"),{
//   setHeaders : (res,filePath) => {
//       if (path.extname(filePath) === ".png" ||
//           path.extname(filePath) === ".webp" ||
//           path.extname(filePath) === ".jpg" ||
//           path.extname(filePath) === ".jpeg" ||
//           path.extname(filePath) === ".gif" ||
//           path.extname(filePath) === ".jfif"){
//           res.setHeader("Content-Type","image/jpeg");
//       }
//   }
// }));

// app.use('/socket.io', e.static(__dirname + '/node_modules/socket.io/client-dist'));
// app.use(
//   "/socket.io",
//   e.static(path.join(__dirname, "../node_modules/socket.io-client/dist"))
// );
// app.use(
//   "/socket.io",
//   e.static(path.join(__dirname, "node_modules", "socket.io", "client-dist"))
// );

// 로그인 라우터 경로 설정
app.use("/login", loginRouter);
app.use(e.urlencoded({ extended: false }));

app.use("/main", mainRouter);
app.use("/signup", signUpRouter);
app.use("/chat", chatRouter);
app.use("/reservation", reservationRouter);
app.use("/mail", mailRouter);
app.use("/mypage", isLoginMiddle, mypageRouter);
app.use("/adminPage", isLoginMiddle, adminPageRouter);
app.use("/freeboards", freeBoardsRouter);
// app.use(e.static(path.join(__dirname, "js")));
app.use("/showdetail", showDetailRouter);
app.use("/dummy", dummyRouter);
app.use("/chart", chartRouter);
app.use("/imgs", e.static(path.join(__dirname, "imgs")));

const server = app.listen(8080, () => {
  console.log("gogo");
});
const io = socketIO(server);
io.on("connection", (socket) => {
  chattingSocket(socket, io);
  socket.on("reservation", () => {
    initReservationSocket(socket, io);
  });
});

app.get("/map", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "FrontEnd", "map.html"));
});

//----------------

// 예매 관련
// initReservationSocket(server);
// 소켓 받는곳, 미들웨어로 다른 곳에서 처리할거임
