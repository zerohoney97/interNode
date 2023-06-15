const e = require("express");
const { sequelize } = require("./models");
const dot = require("dotenv").config();
const cors = require("cors");
const session = require("express-session");
const path = require("path");
const app = e();
const signUpRouter = require("./routers/signUp");
const mainRouter = require("./routers/main");
const chatRouter = require("./routers/chat");

const loginRouter = require("./routers/login");
const freeBoardsRouter = require("./routers/freeBoard");

const mypageRouter = require("./routers/mypage");
const mailRouter = require("./routers/mail");
const { isLogin } = require("./middleware/islogin");
const adminPageRouter = require("./routers/adminMypage");
app.use(e.json());
app.use(e.urlencoded({ extended: false }));

app.use(
  cors({
    origin: [
      "http://127.0.0.1:5500",
      "http://127.0.0.1:8080",
      "http://localhost:8080",
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

// 로그인 라우터 경로 설정
app.use("/login", loginRouter);
app.use(e.urlencoded({ extended: false }));

app.use("/main", mainRouter);
app.use("/signup", signUpRouter);
app.use("/chat", chatRouter);

app.use("/mail", mailRouter);
app.use("/mypage", isLogin, mypageRouter);
app.use("/adminPage", adminPageRouter);
app.use("/freeboards", freeBoardsRouter);
// app.use(e.static(path.join(__dirname, "js")));
app.use(
  "/public",
  e.static(path.join(__dirname, "..", "FrontEnd", "public"), {
    setHeaders: (res, filePath) => {
      if (path.extname(filePath) === ".css") {
        res.setHeader("Content-Type", "text/css");
      }
    },
  })
);

app.use(
  "/js",
  e.static(path.join(__dirname, "..", "FrontEnd", "js"), {
    setHeaders: (res, filePath) => {
      if (path.extname(filePath) === ".js") {
        res.setHeader("Content-Type", "text/javascript");
      }
    },
  })
);

app.use("/imgs", e.static(path.join(__dirname, "imgs")));
app.listen(8080, () => {
  console.log("gogo");
});

//module.exports = server;
