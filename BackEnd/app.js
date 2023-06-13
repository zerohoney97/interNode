const e = require("express");
const { sequelize } = require("./models");
const dot = require("dotenv").config();
const cors = require("cors");
const session = require("express-session");
const path = require("path");
const app = e();
const signUpRouter = require("./routers/signUp");
const mainRouter = require("./routers/main");
const loginRouter = require("./routers/login");

app.use(e.json());
app.use(e.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
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
  .then((e) => {
    console.log("연결 성공~");
  })
  .catch((err) => {
    console.log(err);
  });

// 세션 사용
app.use(session({
  secret : process.env.SESSION_KEY,
  resave : false,
  saveUninitialized : false
}))

app.use(cors({
  // 도메인 허용 옵션
  // 접근을 허용할 도메인
  // 여러개의 도메인을 허용하고 싶다 배열의 형태로 넣어주면 된다
  // origin : ["","",""]
  origin : "http://127.0.0.1:5500",
  // origin : "",
  credentials : true,
}))

// 로그인 라우터 경로 설정
app.use('/login',loginRouter);
app.use(e.urlencoded({ extended: false }));

app.use("/main",mainRouter);
app.use("/signup", signUpRouter);

// app.use(e.static(path.join(__dirname, "js")));
app.use("/public",e.static(path.join(__dirname,"..","FrontEnd","public"),{
    setHeaders : (res,filePath) => {
        if(path.extname(filePath) === ".css"){
            res.setHeader("Content-Type","text/css");
        }
    }
}));
app.listen(8080, () => {
  console.log("gogo");
});
